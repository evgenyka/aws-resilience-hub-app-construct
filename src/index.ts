import * as resiliencehub from 'aws-cdk-lib/aws-resiliencehub';
import { Construct } from 'constructs';
import { createImportResourcesCustomResource, createPublishAppCustomResource } from './custom-resources';
import { createCustomResourceRole } from './iam-role';
import { sourcesWithType, terraformSource } from './utils';

export interface AwsResilienceHubAppProps {
  readonly appName: string;
  readonly sourceArns?: string[];
  readonly terraformSources?: terraformSource[];
  readonly eksSources?: string[];
  readonly resiliencyPolicyArn?: string;
  readonly appAssessmentSchedule?: string;
  readonly appDescription?: string;
  readonly tags?: { [key: string]: string };
  readonly publish?: boolean;
}

export class AwsResilienceHubApp extends Construct {
  public readonly appArn: string;
  public readonly importStatus: string;
  public readonly publishedVersion: string | undefined;

  constructor(scope: Construct, id: string, props: AwsResilienceHubAppProps) {
    super(scope, id);

    // Create the Resilience Hub Application
    const arhApp = new resiliencehub.CfnApp(this, 'ResilienceHubApplication', {
      name: props.appName,
      description: props.appDescription || 'Resilience App created by AwsResilienceHubApp construct',
      appAssessmentSchedule: props.appAssessmentSchedule || 'Daily',
      resiliencyPolicyArn: props.resiliencyPolicyArn,
      appTemplateBody: '{"Resources":{}}',
      resourceMappings: [],
      tags: props.tags || { Managed: 'AwsResilienceHubApp-Construct' },
    });

    // Create IAM Role for Custom Resources
    const customResourceRole = createCustomResourceRole(this, arhApp.attrAppArn);

    const sourcesWithTypes: sourcesWithType = [
      {
        type: 'sourceArns',
        sources: props.sourceArns ?? [], 
      },
      {
        type: 'terraformSources',
        sources: props.terraformSources ?? [], 
      },
      {
        type: 'eksSources',
        sources: props.eksSources ?? [],
      },
    ];

    //console.log('sourceTypes:', JSON.stringify(sourcesWithTypes, null, 2));

    // Create Import Resources Custom Resource
    const importResources = createImportResourcesCustomResource(this, arhApp.attrAppArn, sourcesWithTypes, customResourceRole);

    // Conditionally create the Publish App Custom Resource based on the `publish` property
    let publishApp;
    if (props.publish ?? false) { // Default to false if `publish` is not provided
      publishApp = createPublishAppCustomResource(this, arhApp.attrAppArn, importResources, customResourceRole);
    }

    // Set properties
    this.appArn = arhApp.attrAppArn;
    this.importStatus = importResources.getResponseField('status');
    this.publishedVersion = publishApp?.getResponseField('appVersion');
  }
}

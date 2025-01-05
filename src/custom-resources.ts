import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { SourcesWithType } from './utils';

export function createImportResourcesCustomResource(
  scope: Construct,
  appArn: string,
  sourcesWithType: SourcesWithType,

  customResourceRole: iam.IRole,
): cr.AwsCustomResource {

  // Create the Import Resources custom resource
  const importResources = new cr.AwsCustomResource(scope, 'ImportResources', {
    onCreate: {
      service: 'ResilienceHub',
      action: 'importResourcesToDraftAppVersion',
      parameters: {
        appArn: appArn,
        sourceArns: sourcesWithType.find((source) => source.type === 'sourceArns')?.sources,
        terraformSources: sourcesWithType.find((source) => source.type === 'terraformSources')?.sources,
        eksSources: sourcesWithType.find((source) => source.type === 'eksSources')?.sources,
      },
      physicalResourceId: cr.PhysicalResourceId.of('ImportResourcesStaticId'),
    },
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
      resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
    role: customResourceRole,
  });

  return importResources; // Ensure the custom resource is returned
}

export function createPublishAppCustomResource(
  scope: Construct,
  appArn: string,
  importResources: cr.AwsCustomResource,
  customResourceRole: iam.IRole,
): cr.AwsCustomResource {
  // Create the Publish App custom resource
  const publishApp = new cr.AwsCustomResource(scope, 'PublishApp', {
    onCreate: {
      service: 'ResilienceHub',
      action: 'publishAppVersion',
      parameters: {
        appArn: appArn,
      },
      physicalResourceId: cr.PhysicalResourceId.of('ImportResourcesStaticId'),
    },
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
      resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
    role: customResourceRole,
  });

  // Ensure the Publish App custom resource depends on the Import Resources step
  publishApp.node.addDependency(importResources);

  return publishApp; // Ensure the custom resource is returned
}

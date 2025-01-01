import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export function createCustomResourceRole(scope: Construct, appArn: string, sourceStackName: string): iam.Role {
  return new iam.Role(scope, 'CustomResourceRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    description: 'Role for AWS Resilience Hub import and publish operations',
    inlinePolicies: {
      ResilienceHubOperations: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: [
              'resiliencehub:ImportResourcesToDraftAppVersion',
              'resiliencehub:DescribeDraftAppVersionResourcesImportStatus',
              'resiliencehub:PublishAppVersion',
            ],
            resources: [appArn], // Restrict to the specific Resilience Hub application ARN
          }),
          new iam.PolicyStatement({
            actions: [
              'cloudformation:DescribeStacks', // Action to describe the stack
            ],
            resources: [
              `arn:aws:cloudformation:*:*:stack/${sourceStackName}/*`, // Restrict to specific stack ARN
            ],
          }),
        ],
      }),
    },
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('AWSResilienceHubAsssessmentExecutionPolicy'),
    ],
  });
}

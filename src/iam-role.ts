import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export function createCustomResourceRole(scope: Construct, appArn: string): iam.Role {
  return new iam.Role(scope, 'CustomResourceRole', {
    assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    description: 'Role for AWS Resilience Hub import and publish operations',
    inlinePolicies: {
      ResilienceHubOperations: new iam.PolicyDocument({
        statements: [
          new iam.PolicyStatement({
            actions: [
              'resiliencehub:ImportResourcesToDraftAppVersion',
              'resiliencehub:PublishAppVersion',
            ],
            resources: [appArn], // Restrict to the specific Resilience Hub application
          }),
          new iam.PolicyStatement({
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
            ],
            resources: ['arn:aws:logs:*:*:*'], // Allow logging to any CloudWatch log group
          }),
        ],
      }),
    },
    managedPolicies: [
      iam.ManagedPolicy.fromAwsManagedPolicyName('AWSResilienceHubAsssessmentExecutionPolicy'),
    ],
  });
}

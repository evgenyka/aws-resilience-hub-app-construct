import * as iam from 'aws-cdk-lib/aws-iam';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

/**
 * Fetches the ARN of the CloudFormation stack.
 * @param scope - The construct scope.
 * @param sourceStackName - The name of the CloudFormation stack.
 * @param customResourceRole - The role for the custom resource.
 * @returns - The ARN of the CloudFormation stack.
 */
export function fetchStackArn(
  scope: Construct,
  sourceStackName: string,
  customResourceRole: iam.IRole,
): string {
  // Create the custom resource that retrieves the stack ARN
  const getStackArn = new cr.AwsCustomResource(scope, 'GetStackArn', {
    onCreate: {
      service: 'CloudFormation',
      action: 'describeStacks',
      parameters: { StackName: sourceStackName },
      physicalResourceId: cr.PhysicalResourceId.of(`GetStackArn-${sourceStackName}`),
    },
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
      resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
    role: customResourceRole,
  });

  // Return the ARN of the stack (the custom resource response field)
  return getStackArn.getResponseField('Stacks.0.StackId');
}

// bin/deploy.ts
import * as cdk from 'aws-cdk-lib';
import { AwsResilienceHubApp } from '../src';

const app = new cdk.App();

// Create a CDK Stack to deploy the custom construct
const stack = new cdk.Stack(app, 'MyTestStack', {
  //env: { region: 'us-east-1' },
});

// Add our custom construct to the stack
new AwsResilienceHubApp(stack, 'MyResilienceHubAppConstruct', {
  appName: 'TestApp',
  resiliencyPolicyArn: 'arn:aws:resiliencehub:region:account:resiliency-policy/policy-arn',
  sourceArns: [
    'arn:aws:cloudformation:region:account:stack/first-stack-name/first-stack-id',
    'arn:aws:cloudformation:region:account:stack/second-stack-name/second-stack-id',
  ],
  publish: true,
  tags: {
    'Application': 'DemoApplication',
  }
});

// bin/deploy.ts
import * as cdk from 'aws-cdk-lib';
import { AwsResilienceHubApp } from '../src';

const app = new cdk.App();

// Create a CDK Stack to deploy the custom construct
const stack = new cdk.Stack(app, 'MyTestStack', {
  //env: { region: 'us-east-1' },
});

// Add your custom construct to the stack
new AwsResilienceHubApp(stack, 'MyResilienceHubAppConstruct', {
  appName: 'TestApp',
  resiliencyPolicyArn: 'arn:aws:resiliencehub:us-east-2:608935286732:resiliency-policy/6e582802-403b-4362-871a-b2479003837a',
  sourceStackName: 'DemoApplication',
  publish: true,
  tags: {
    'Application': 'DemoApplication',
  }
});

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
  resiliencyPolicyArn: 'arn:aws:resiliencehub:us-east-2:608935286732:resiliency-policy/6e582802-403b-4362-871a-b2479003837a',
  terraformSources: [ 
    { 
       s3StateFileUrl: 's3://my-terraform-bucket-f099a581d3e253ce/terraform/terraform.tfstate',
    }
  ],
  //sourceArns: [
  //  'arn:aws:cloudformation:us-east-2:608935286732:stack/DemoApplication/e5bcc650-f191-11ee-acfb-02bc599451bb',
    //'arn:aws:cloudformation:us-east-2:608935286732:stack/arh-lab-workload/d4029020-c927-11ef-8c28-021e135c1eab',
    //'arn:aws:resource-groups:us-east-2:608935286732:group/myApp2arh-app/09n3g3nfl3gyw8nxizb08ekoqe',
  //],
  publish: true,
  tags: {
    'Application': 'DemoApplication',
  }
});


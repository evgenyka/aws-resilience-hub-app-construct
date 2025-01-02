import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as AwsResilienceHubApp from '../src';

test('AwsResilienceHubApp Created', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new AwsResilienceHubApp.AwsResilienceHubApp(stack, 'TestApp', {
    appName: 'TestResilienceHubApp',
    resiliencyPolicyArn: 'arn:aws:resiliencehub:region:account:resiliency-policy/policy-arn',
    sourceArns: [
      'arn:aws:cloudformation:region:account:stack/first-stack-name/first-stack-id',
      'arn:aws:cloudformation:region:account:stack/second-stack-name/second-stack-id',
    ],
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::ResilienceHub::App', 1);

  template.hasResourceProperties('AWS::ResilienceHub::App', {
    Name: 'TestResilienceHubApp',
  });

});
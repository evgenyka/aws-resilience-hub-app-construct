import { App, Stack } from 'aws-cdk-lib';
import { AwsResilienceHubApp } from '../src';
import { Template } from 'aws-cdk-lib/assertions';

describe('AwsResilienceHubApp', () => {
  let app: App;
  let stack: Stack;

  beforeEach(() => {
    app = new App();
    stack = new Stack(app, 'TestStack');
  });

  it('should accept sourceArns as a valid source', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
      sourceArns: ['arn:aws:s3:::mybucket'],
    };

    // WHEN
    const resilienceHub = new AwsResilienceHubApp(stack, 'TestResilienceHub', props);

    // THEN
    expect(resilienceHub.appArn).toBeDefined();
  });

  it('should accept terraformSources as a valid source', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
      terraformSources: ['s3://mybucket/terraform.tf'],
    };

    // WHEN
    const resilienceHub = new AwsResilienceHubApp(stack, 'TestResilienceHub', props);

    // THEN
    expect(resilienceHub.appArn).toBeDefined();
  });

  it('should accept eksSources as a valid source', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
      eksSources: ['cluster-1'],
    };

    // WHEN
    const resilienceHub = new AwsResilienceHubApp(stack, 'TestResilienceHub', props);

    // THEN
    expect(resilienceHub.appArn).toBeDefined();
  });

  it('should throw error when multiple sources are provided', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
      sourceArns: ['arn:aws:s3:::mybucket'],
      terraformSources: ['s3://mybucket/terraform.tf'],
    };

    // WHEN & THEN
    expect(() => {
      new AwsResilienceHubApp(stack, 'TestResilienceHub', props);
    }).toThrow('Only one source type (sourceArns, terraformSources, or EKSsources) can be provided');
  });

  it('should throw error when no source is provided', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
    };

    // WHEN & THEN
    expect(() => {
      new AwsResilienceHubApp(stack, 'TestResilienceHub', props);
    }).toThrow('At least one source must be provided');
  });

  it('should create app with default values when only required props are provided', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
    };
    
    // WHEN
    new AwsResilienceHubApp(stack, 'TestResilienceHub', props);
    const template = Template.fromStack(stack);

    // THEN
    template.hasResourceProperties('AWS::ResilienceHub::App', {
      Name: 'TestApp',
      AppAssessmentSchedule: 'Daily',
      Description: 'Resilience App created by AwsResilienceHubApp construct',
      Tags: {
        Managed: 'AwsResilienceHubApp-Construct'
      }
    });
  });

  it('should create app with custom values when provided', () => {
    // GIVEN
    const props = {
      appName: 'TestApp',
      sourceArns: ['arn:aws:s3:::mybucket'],
      appDescription: 'Custom description',
      appAssessmentSchedule: 'Weekly',
      tags: {
        Environment: 'Production'
      }
    };

    // WHEN
    new AwsResilienceHubApp(stack, 'TestResilienceHub', props);
    const template = Template.fromStack(stack);

    // THEN
    template.hasResourceProperties('AWS::ResilienceHub::App', {
      Name: 'TestApp',
      AppAssessmentSchedule: 'Weekly',
      Description: 'Custom description',
      Tags: {
        Environment: 'Production'
      }
    });
  });
});

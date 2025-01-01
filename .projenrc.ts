import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Evgeny Karasik',
  authorAddress: 'ekarasik@amazon.com',
  cdkVersion: '2.173.4',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.7.0',
  name: 'aws-resiliencehub-app',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/ekarasik/aws-resiliencehub-app.git',
  description: 'An L2 construct for AWS Resilience Hub application with resource import and publish capabilities',

  deps: [
    'aws-cdk-lib',
    'constructs',
  ],

  peerDeps: [
    'aws-cdk-lib',
    'constructs',
  ],

  devDeps: [
    'aws-cdk-lib',
    'constructs',
  ],

  publishToPypi: {
    distName: 'aws-resiliencehub-app',
    module: 'aws_resiliencehub_app',
  },
});

project.synth();
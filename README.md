
# AWS Resilience Hub App Construct

This repository contains a custom AWS CDK construct that simplifies the process of creating and managing AWS Resilience Hub applications. The construct allows users to integrate AWS Resilience Hub with CloudFormation stacks, import resources, and publish resilience application versions.

## Features

- **Custom Resource Creation**: Creates a custom AWS IAM role and integrates with AWS Resilience Hub for resource import and application publishing.
- **Resource Import**: Imports resources from a specified CloudFormation stack into the AWS Resilience Hub application.
- **Application Publishing**: Publishes the Resilience Hub application version after importing the resources.

## Requirements

- AWS CDK v2 or later
- Node.js 14.x or later
- AWS CLI configured with the appropriate permissions
- An AWS account with Resilience Hub service enabled

## Setup

### Prerequisites

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/evgenyka/aws-resilience-hub-app-construct.git
   cd aws-resilience-hub-app-construct
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. **Define the Construct in Your CDK App**

   You can use the construct in your CDK application by importing it from the `src` directory:

   ```typescript
   import { AwsResilienceHubApp } from './src';
   import * as cdk from 'aws-cdk-lib';

   const app = new cdk.App();
   new AwsResilienceHubApp(app, 'MyResilienceHubApp', {
     appName: 'MyApplication',
     resiliencyPolicyArn: 'arn:aws:resiliencehub:us-west-2:123456789012:resiliency-policy/my-resiliency-policy',
     sourceStackName: 'MySourceStack',
     appAssessmentSchedule: 'Daily',
     appDescription: 'This is my AWS Resilience Hub application',
   });
   ```

2. **Deploy the CDK Stack**

   After defining the stack in the app, deploy it using the following command:

   ```bash
   cdk deploy
   ```

### Configuration

The construct requires the following properties:

- **`appName`**: The name of the Resilience Hub application.
- **`resiliencyPolicyArn`**: The ARN of the resiliency policy to apply to the application.
- **`sourceStackName`**: The name of the CloudFormation stack to import resources from.
- **`appAssessmentSchedule`** (optional): The assessment schedule for the application. Defaults to 'Daily'.
- **`appDescription`** (optional): A description for the Resilience Hub application. Defaults to 'Resilience configuration created by AwsResilienceHubApp construct'.
- **`tags`** (optional): Tags to apply to the Resilience Hub application.

### Testing

To test the construct, you can use the AWS CDK's testing framework to simulate the deployment in a local environment. Make sure your environment is correctly configured with the necessary AWS credentials.

### Excluding Files

Make sure to exclude the `cdk.out` directory from version control by adding it to your `.gitignore`:

```bash
# .gitignore
cdk.out/
```

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# Terraform Provider Configuration
provider "aws" {
  region = "us-east-2"
}

# Generate a unique ID for the Lambda function and resources
resource "random_id" "unique" {
  byte_length = 8
}

# Create an S3 Bucket to store resources and the state file
resource "aws_s3_bucket" "my_bucket" {
  bucket = "my-sample-bucket-${random_id.unique.hex}"

  tags = {
    Origin = "terraform"
  }
}

# Enable versioning for the S3 Bucket using a separate resource
resource "aws_s3_bucket_versioning" "my_bucket_versioning" {
  bucket = aws_s3_bucket.my_bucket.bucket
  versioning_configuration {
    status = "Enabled"
  }
}

# Create a DynamoDB Table
resource "aws_dynamodb_table" "my_table" {
  name         = "my-dynamodb-table-${random_id.unique.hex}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}

# IAM Role for Lambda to access other AWS services
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda-execution-role-${random_id.unique.hex}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# Create a Lambda Function
resource "aws_lambda_function" "my_lambda" {
  function_name = "my-lambda-function-${random_id.unique.hex}"

  s3_bucket = aws_s3_bucket.my_bucket.bucket
  s3_key    = "lambda/lambda-code.zip"  # Specify the S3 object key for the Lambda function

  handler = "index.handler"
  runtime = "nodejs16.x"  # Use a supported runtime like nodejs16.x

  role = aws_iam_role.lambda_exec_role.arn
}

# Upload the Lambda ZIP code to S3 (ensure this file exists locally)
resource "aws_s3_object" "lambda_zip" {
  bucket = aws_s3_bucket.my_bucket.bucket
  key    = "lambda/lambda-code.zip"
  source = "lambda-code.zip"  # Local path to your Lambda function ZIP file
}

# Upload Terraform State File to S3
resource "aws_s3_object" "state_file" {
  bucket = aws_s3_bucket.my_bucket.bucket
  key    = "terraform/terraform.tfstate"  # Specify the path for the state file in the S3 bucket
  source = "terraform.tfstate"  # Local path to the Terraform state file
}

# Output the URL of the uploaded state file
output "state_file_url" {
  value = "https://${aws_s3_bucket.my_bucket.bucket}.s3.${data.aws_region.current.name}.amazonaws.com/${aws_s3_object.state_file.key}"
}

# Data source for AWS region
data "aws_region" "current" {}
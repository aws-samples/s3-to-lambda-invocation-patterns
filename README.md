
# S3-to-Lambda patterns: Avoiding recursive invocation

These examples show ways to avoid recursive invocation with Lambda functions and S3 buckets.

To learn more about how this works, see the AWS Compute Blog post: TBD.

Important: this application uses various AWS services and there are costs associated with these services after the Free Tier usage - please see the [AWS Pricing page](https://aws.amazon.com/pricing/) for details. You are responsible for any AWS costs incurred. No warranty is implied in this example.

```bash
.
├── README.MD          <-- This instructions file
├── 1-preferred        <-- The preferred, 2-bucket method for processing S3 objects
├── 2-metadata         <-- Write back to the same bucket, using metadata to avoid recursion.
├── 3-prefix           <-- Write back to the same bucket, using key prefix to avoid recursion.
├── 4-ddb              <-- Write back to the same bucket, using DynamoDB to avoid recursion.
```

## Requirements

* An AWS account. ([Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.)
* AWS CLI already configured with Administrator permission
* [AWS SAM CLI installed](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) - **minimum version 0.48**.
* [NodeJS 14.x installed](https://nodejs.org/en/download/)

## Installation instructions

1. Clone the repo onto your local development machine:
```
git clone https://github.com/aws-samples/s3-to-lambda-avoiding-recursive-invocation
```

2. Change directory into one of the four examples you want to deploy.
3. Deploy using AWS SAM:
```
sam deploy --guided 
```
During the prompts, enter unique S3 bucket names and your preferred Region. Accept the defaults for the remaining questions.

## Cleanup

1. Manually delete any objects in the application's S3 buckets.
2. Use the CloudFormation console to delete all the stacks deployed.

## Next steps

The AWS Compute Blog post at the top of this README file contains additional information about the examples.

If you have any questions, please contact the author or raise an issue in the GitHub repo.

==============================================

Copyright 2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.

SPDX-License-Identifier: MIT-0


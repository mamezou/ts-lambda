import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  aws_lambda_nodejs as NodeLambda,
  aws_lambda as Lambda,
  aws_apigateway as ApiGateway
} from 'aws-cdk-lib'
import * as path from 'path'

export class TsLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const testFunction = new NodeLambda.NodejsFunction(this, 'testFunction',{
      functionName: 'testFunction',
      entry: path.join(__dirname, '../lambda/index.ts'),
      runtime: Lambda.Runtime.NODEJS_14_X,
      handler: 'handler',
    })

    new ApiGateway.LambdaRestApi(this, 'lambdaTest',{
      handler: testFunction
    })
  }
}

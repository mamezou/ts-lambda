#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TsLambdaStack } from '../lib/ts-lambda-stack';

const app = new cdk.App();
new TsLambdaStack(app, 'TsLambdaStack');

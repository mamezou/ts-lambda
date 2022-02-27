import { DockerImage, Duration, Stack, StackProps } from 'aws-cdk-lib';
import {
  aws_s3 as s3,
  aws_s3_deployment as s3deploy
} from 'aws-cdk-lib';
import { spawnSync } from 'child_process';
import { Construct } from 'constructs';

export class StaticStack extends Stack{
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const staticSiteBucket = new s3.Bucket(this, 'Bucket',{
      bucketName: `testMyBucket${new Date()}`,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html'
    })
    const staticSite = s3deploy.Source.asset('../frontend',{
      bundling:{
        image: DockerImage.fromRegistry('node'),
        local:{
          tryBundle: (outputDir) =>{
            spawnSync('yarn',['generate', outputDir],{
              stdio: 'inherit'
            })
            return true
          }
        }
      }
    })

    new s3deploy.BucketDeployment(this, 'BucketDeployment',{
      sources: [staticSite],
      destinationBucket: staticSiteBucket
    })
  }
}
# among-eus
Among Eus Game by USE Team in Camp 2021


## Amazon Cloud Deployment with Elastic Beanstalk

### Deploy

For subprojects that are configured for deployments:

> eb deploy
1. Install Elastic Beanstalk tooling
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-windows.html
2. Deploy as follows:
   `> eb deploy`
     - secret for the deployment (ask Rolf!)

### Configure Deployment (Java)

1. Install Elastic Beanstalk tooling
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-windows.html
2. Go to subproject folder you want to deploy and configure tooling as follows:
   > eb init
     - 14 for region Ohio
     - secret for the deployment (ask rolf!)
     - 2 for new application
     - among-eus-<submodule> as a nice name for the application
     - 6 for Java
     - 1 for Coretto 11
     - n for no ssh
3. applications.properties set the port to 5000:
       server.port=5000
4. Configure the artifat to deploy in .elasticsearch/config.yml:
     deploy:
       artifact: target/games-0.0.1-SNAPSHOT.jar
5. eb create -s
     - use the default values
     - (-s is important for not having several load balanced instances and avoid extra costs)
6. Remove files added to .gitignore from .gitignore to commit the deployment config
7. Redeployment can be triggered as simple as follows:
    `> eb deploy`
                                                          
See also https://mydeveloperplanet.com/2020/10/21/how-to-deploy-a-spring-boot-app-to-aws-elastic-beanstalk/

### Amazon MSK - Managed Kafka                                                      >

Zookeeper URLs: z-2.among-eus-events.ytwrun.c2.kafka.us-east-2.amazonaws.com:2181,z-1.among-eus-events.ytwrun.c2.kafka.us-east-2.amazonaws.com:2181,z-3.among-eus-events.ytwrun.c2.kafka.us-east-2.amazonaws.com:2181

Caution: Is not accessible from outside Amazon Cloud

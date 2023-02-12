{
    "Description": "Effective DevOps in AWS: HelloWorld web application - Updated by [Your Name]",
    "Outputs": {
        "InstancePublicIp": {
            "Description": "Public IP of our instance.",
            "Value": {
                "Fn::GetAtt": [
                    "instance",
                    "PublicIp"
                ]
            }
        },
        "WebUrl": {
            "Description": "Application endpoint",
            "Value": {
                "Fn::Join": [
                    "",
                    [
                        "http://",
                        {
                            "Fn::GetAtt": [
                                "instance",
                                "PublicDnsName"
                            ]
                        },
                        ":",
                        "3333"
                    ]
                ]
            }
        }
    },
    "Parameters": {
        "KeyPair": {
            "ConstraintDescription": "must be the name of an existing EC2 KeyPair.",
            "Description": "Name of an existing EC2 KeyPair to SSH",
            "Type": "AWS::EC2::KeyPair::KeyName"
        }
    },
    "Resources": {
        "SecurityGroup": {
            "Properties": {
                "GroupDescription": "Allow SSH and TCP/3333 access",
                "SecurityGroupIngress": [
                    {
                        "CidrIp": "0.0.0.0/0",
                        "FromPort": "22",
                        "IpProtocol": "tcp",
                        "ToPort": "22"
                    },
                    {
                        "CidrIp": "0.0.0.0/0",
                        "FromPort": "3333",
                        "IpProtocol": "tcp",
                        "ToPort": "3333"
                    }
                ]
            },
            "Type": "AWS::EC2::SecurityGroup"
        },
        "instance": {
            "Properties": {
                "ImageId": "ami-cfe4b2b0",
                "InstanceType": "t2.nano",
                "KeyName": {
                    "Ref": "KeyPair"
                },
                "SecurityGroups": [
                    {
                        "Ref": "SecurityGroup"
                    }
                ],
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "HelloWorldInstance"
                    },
                    {
                        "Key": "InstanceType",
                        "Value": "T2.nano"
                    }
                ],
                "UserData": {
                    "Fn::Base64": {
                        "Fn::Join": [
                            "\n",
                            [
                                "#!/bin/bash",
                                "sudo yum install --enablerepo=epel -y nodejs",
                                "wget [URL to modified helloworld.js file on Github or S3 bucket] -O /home/ec2-user/helloworld.js",
                                "wget http://bit.ly/2vVvT18 -O /etc/init/helloworld.conf",
                                "start helloworld"

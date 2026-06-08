pipeline {
    agent any

    environment {
        AWS_REGION = "ap-south-1"
        ACCOUNT_ID = "165314937469"
        REPO_NAME = "docker-images"
        IMAGE_TAG = "${BUILD_NUMBER}"
        ECR_REPO = "${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}"
    }

    stages {

        stage('Clone Code') {
            steps {
                git url: 'https://github.com/saurabh633848-max/newwebstite.git', branch: 'main'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $REPO_NAME:$IMAGE_TAG .
                '''
            }
        }

        stage('Tag Image') {
            steps {
                sh '''
                docker tag $REPO_NAME:$IMAGE_TAG $ECR_REPO:$IMAGE_TAG
                '''
            }
        }

        stage('Login to AWS ECR') {
            steps {
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', credentialsId: 'aws-creds']]) {
                    sh '''
                    aws ecr get-login-password --region $AWS_REGION | \
                    docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
                    '''
                }
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh '''
                docker push $ECR_REPO:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo "✅ Image pushed successfully: $ECR_REPO:$IMAGE_TAG"
        }
        failure {
            echo "❌ Build failed. Check Jenkins logs."
        }
    }
}

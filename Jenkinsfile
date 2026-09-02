pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Verify Tag'){
            steps {
                script{
                    def tag = sh(script: "git tag --points-at HEAD 2>/dev/null || echo ''", returnStdout: true).trim()
                    if (!tag) {
                        error("No tag found. Pipeline only runs on tagged commits.")
                    }
                    echo "Deploying tag: ${tag}"
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'chmod +x deploy.sh && ./deploy.sh'
            }
        }

    }
    post {
        success {
            echo "App is live on port 80"
        }
        failure {
            echo "Deployment failed. Check logs"
        }
    }

}
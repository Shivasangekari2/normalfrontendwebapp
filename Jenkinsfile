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
                    def tag = sh(script: "git describe --tags --abbrev=0 2>/dev/null || echo ''", returnStdout: true).trim()
                    echo "Latest tag: ${tag}"
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
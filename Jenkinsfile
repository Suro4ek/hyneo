#!/usr/bin/env groovy

 pipeline {

     agent any
     environment {
        registry = "registry.hyneo.ru/site"
        registryCredential = "nexusadmin"
        dockerImage = ''
     }

     stages {
         stage('Build') {
             steps {
              script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
                }
             }
         }
         stage('Push registry nexus'){
             steps{
                 script{
                     docker.withRegistry('https://registry.hyneo.ru', registryCredential ) {
                         dockerImage.push()
                         dockerImage.push('latest')
                     }
                 }
             }
        }
        stage ('Deploy') {
            steps{
                sshagent(credentials : ['launch']) {
                sh '''
                    ssh -p 11 suro@mc.hyneo.ru
                '''
                sh 'cd ./site'
                sh 'docker compose pull site'
                sh 'docker compose restart site'
                }
            }
        }
     }
}
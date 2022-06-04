#!/bin/bash
cd /home/ubuntu/just-moment-trip/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export NODE_ENV=$(aws ssm get-parameters --region ap-northeast-2 --names NODE_ENV --query Parameters[0].Value | sed 's/"//g')
export SLACK_BOT_API=$(aws ssm get-parameters --region ap-northeast-2 --names SLACK_BOT_API --query Parameters[0].Value | sed 's/"//g')
export SLACK_CHANNEL=$(aws ssm get-parameters --region ap-northeast-2 --names SLACK_CHANNEL --query Parameters[0].Value | sed 's/"//g')
export KAKAO_CLIENT=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT --query Parameters[0].Value | sed 's/"//g')
export KAKAO_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export LOWERMONOALPHABET=$(aws ssm get-parameters --region ap-northeast-2 --names LOWERMONOALPHABET --query Parameters[0].Value | sed 's/"//g')
export UPPERMONOALPHABET=$(aws ssm get-parameters --region ap-northeast-2 --names UPPERMONOALPHABET --query Parameters[0].Value | sed 's/"//g')
export SHIFTNUMBER=$(aws ssm get-parameters --region ap-northeast-2 --names SHIFTNUMBER --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js
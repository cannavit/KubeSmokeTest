# Smoke-Master. 
# Project for create automatic smoke-testing suites. 
FROM node:15.8.0-alpine
# FROM node:14.4.0
WORKDIR /tmp

ARG KUBERNETES_TOKEN
ENV KUBERNETES_TOKEN=$KUBERNETES_TOKEN

RUN echo $KUBERNETES_TOKEN
# Install uitls and install kubectl
RUN apk update \
    && apk add curl \
    && apk add util-linux \
    && /usr/bin/curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl \
    && chmod +x ./kubectl  \
    &&  mv ./kubectl /usr/local/bin/kubectl 

# Directory by config certify. 
RUN mkdir -p /etc/deploy && mkdir -p /usr/src/app
RUN echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
# Directory by config certify. 
RUN mkdir -p $HOME/.kube/
RUN echo $KUBERNETES_TOKEN | base64 -d > $HOME/.kube/config


RUN kubectl config view

WORKDIR /usr/src/app
# COPY . /usr/src/appclear

# RUN npm install  #? old
# RUN npm install shelljs #? old
RUN npm init --yes
RUN npm set-script smoke-test "jest"
RUN npm i jest smktest-utils \
    && npm i create-smktest smktest-utils -g 

# RUN npm link

# Genrerate automatic test 
RUN create-smktest --cluster-coverage

CMD npm run smoke-test



# --env PORT=3070
# export KUBERNETES_TOKEN="YXBpVmVyc2lvbjogdjEKa2luZDogQ29uZmlnCmNsdXN0ZXJzOgotIG5hbWU6ICJ0Z2ktaGV0em5lciIKICBjbHVzdGVyOgogICAgc2VydmVyOiAiaHR0cHM6Ly9vcGVuc2hpZnQudGVjaGdhcC5pdDo4NDQzL2s4cy9jbHVzdGVycy9jLWhwcjV3IgogICAgY2VydGlmaWNhdGUtYXV0aG9yaXR5LWRhdGE6ICJMUzB0TFMxQ1JVZEpUaUJEUlZKVVNVWkpRMEZVUlMwdExTMHRDazFKU1VNM2FrTkRRXAogICAgICBXUmhaMEYzU1VKQlowbENRVVJCVGtKbmEzRm9hMmxIT1hjd1FrRlJjMFpCUkVGdlRWSkpkMFZCV1VSV1VWRkxSWGRzTUdGSFZYUUtZXAogICAgICAyMUdkVmt5WjNoRmFrRlJRbWRPVmtKQlRWUkRWMDVvWkVoU2MxcFRNV3BaVkVGbFJuY3dlRTlVUVRWTmFsbDRUVVJCTkU1RVZtRkdkXAogICAgICB6QjVUMVJCTlFwTmFrMTRUVVJCTkU1RVZtRk5RMmQ0UldwQlVVSm5UbFpDUVc5VVExaFNiMXBUTVhsWlZ6VnFZVVJGVTAxQ1FVZEJNXAogICAgICBWVkZRWGhOU2xreVJqQmtSM2hzQ2t4WFRtaE5TVWxDU1dwQlRrSm5hM0ZvYTJsSE9YY3dRa0ZSUlVaQlFVOURRVkU0UVUxSlNVSkRaXAogICAgICAwdERRVkZGUVc5VFIzTjNaVXBKVVdoMFZuY3dOak1LVmxKbGJqSlVTMGhRTm5sM1RIWTFkek5OTVRaSE56UjJORzlHTjBZMFMyNVdiXAogICAgICAyRmFaVlpTVFd4c1NEQjBiMlZMYTFSQ1lqbFNORVEwVkZwSGJVdE5hQXBFYjFRNU9YUjNNVEJEWnpSRk0xazBaQ3M0U1V0cVVtNHpiXAogICAgICBrYzJTakl5WkVkMVNXZFlTRk53TTFCV1lta3JWRzVpVFZKNGMyVlBkVXQzYVhWdmNWQndDbkZrVFRoMmFGaHZPREJEUmpaR1NGcEZaXAogICAgICBsVk5iVzh5YjNaMmRtSTNhMk56UzFkaVFuUjZaREpoWWxaTE0yRklORlpwZVhkRE9EZHVXa292Y0M5SVVGVUtPV280TmxGcE5FaE9aXAogICAgICAzZHRlVmxpUTNSV1VtZEpVRUZJY0RRelRVaE5MekppYlRKWE5HSTBia1V3V0dkdFR6QnpWSGg1U1hsdmJFSm9SekZWTlRCV05ncHVSXAogICAgICBHVjVRamhwZFVOTWRIZERiV3gxVUV4WVVVVmpkME5pV2twVVQwWnBaa1ZvS3k5TmJGRklka0l2YTBsTmJHWkJlVFJqTlZaS05UVllUXAogICAgICBHWlpTRTQzQ21kTWVYRnZVVWxFUVZGQlFtOTVUWGRKVkVGUFFtZE9Wa2hST0VKQlpqaEZRa0ZOUTBGeFVYZEVkMWxFVmxJd1ZFRlJTXAogICAgICBDOUNRVlYzUVhkRlFpOTZRVTRLUW1kcmNXaHJhVWM1ZHpCQ1FWRnpSa0ZCVDBOQlVVVkJVVWxuWW0wNWVVUm5USE5PTVdselYyOUdWXAogICAgICBVcFlNakZwTWk5V05reENRbEJ0WlU4MlRVTnBWUXAyY2xOTVJUVkRRMUZ5TVZZd01tdDZTRWhMWmtSdlZtRm9SME5MYW5wU2VHVkNaXAogICAgICBVTlRVa3RNU0dwT2VUQkdMMElyV1hwR05XeE5RM2xGYVhaRmVUUlRDalYxYjFSa2FWUkJiR2RUSzNGNE1reDZWRzVaV1RKa1kzY3plXAogICAgICBrZFJZV2hMVDAxVVQwYzRZVEpRVkdkM1ZuZzNTa2RWVGt0V00xQk1Za1JHZUVGb1VHc0tlVWhOWkRGblJXNVRhVVJuTHpoYUwwdEpSXAogICAgICBuZEhSa05HVUhGNmNtOVRUekZqVnpCNlpUZ3JURGgzUzBOM0szTkhPRnB6VlRSQ2RrYzFVVFZ4YzFSWWNRb3dWak5yTTA1clpETkhlXAogICAgICBWUlFTR1JyVkdaRFZGWTRURlZ0VFRGemRuRXpibllyVGpscFN6aGhVa0prY1ZZMlN6RnVOMUJDU1c5VVN6Qm9SWFZTYmxWRkNtRmhiXAogICAgICBYSmFkRWxWVkRSc2JFNURlVFowYjBOcFVuQTBja1Z6SzFGalVITnZPVVEzUVd4cE5VdHVVRlpJUzJjOVBRb3RMUzB0TFVWT1JDQkRSXAogICAgICBWSlVTVVpKUTBGVVJTMHRMUzB0IgotIG5hbWU6ICJ0Z2ktaGV0em5lci1yYW5jaGVyIgogIGNsdXN0ZXI6CiAgICBzZXJ2ZXI6ICJodHRwczovLzUuOS4yMzYuMTc6NjQ0MyIKICAgIGNlcnRpZmljYXRlLWF1dGhvcml0eS1kYXRhOiAiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVTjNha05EUVwKICAgICAgV0Z4WjBGM1NVSkJaMGxDUVVSQlRrSm5hM0ZvYTJsSE9YY3dRa0ZSYzBaQlJFRlRUVkpCZDBSbldVUldVVkZFUlhka2NtUlhTbXdLVFwKICAgICAgRmRPYUUxQ05GaEVWRVUxVFVScmVVNXFSWGROVkVVd1RXeHZXRVJVU1RWTlJHdDVUWHBGZDAxVVJUQk5iRzkzUldwRlVVMUJORWRCTVwKICAgICAgVlZGUVhoTlNBcGhNMVpwV2xNeGFsbFVRME5CVTBsM1JGRlpTa3R2V2tsb2RtTk9RVkZGUWtKUlFVUm5aMFZRUVVSRFEwRlJiME5uWlwKICAgICAgMFZDUVV4V2EzcHBkVU5NZWk5cUNraFVUazh5U1RoeVkzSlpaRWt4ZGpCbmVtNVFTamxNVVRKaU1ERkpaMVYwWkdSVVNVMTJOVEZ0V1wKICAgICAgRTkwZW14MFpGTkplVm96VUdab2FVOW5jM1Z3Y1VvS2JtdDJNVFZMTlVOQ04yNXZlbmxFYVdsc2FtRnRXRVl4TWtwaWMxTkdUMUp1WlwKICAgICAgbEZxYkVjeldYUnJRMU42UVRkTWFrRXpWUzg0TmxwNFFuZDJlRmhtY1FwR1NrRkhPQ3RRY1dSWFJ6QnRSRkYxZFdOcWNGZDRObXRLWVwKICAgICAgMEZaU0ZnNFdEaFhSM2hoUTA1aU4xazFXVE5PYUZoQ1ZUZHNLekJyVVdvNU4yTk1jbU0zQ2pKbWIyeFBjWFJNUVdzNWRXczVSbEZXV1wKICAgICAgVU15Ym5wUVdUQTBkRlpqVkVReU0zQnRheXRqUW1SdVZXTklhV0pzWmtWNFowRm1TREU0TmtwNmJtWjJjVGNLTWtWYU4zTjNOMVozVVwKICAgICAgM00zTWxvMU5sZDNOV05WYkZGMFVtYzBWMnBRYVhOc2RYRlBibE5CVEVOQ1ZUaEdkakJyYmtoRU1rc3JibnAxYWtGaFpsVlJOUW8wT1wKICAgICAgV0ZKTkM5U1UxbHNZME5CZDBWQlFXRk5hazFEUlhkRVoxbEVWbEl3VUVGUlNDOUNRVkZFUVdkTGEwMUJPRWRCTVZWa1JYZEZRaTkzVVwKICAgICAgVVpOUVUxQ0NrRm1PSGRFVVZsS1MyOWFTV2gyWTA1QlVVVk1RbEZCUkdkblJVSkJSVFJJV21oS1JrcFFjbmR4YzNncmJEaFdkMnAzUVwKICAgICAgMjFoZERGeE5FdDVlRkZyVm5FS2FFdG1kSGxxUTFWSVJWQXpUM1ZRVVU1dWJXWldLMkZUVm1SbEwzVnNkMGRKSzFsbFpHZFBZVFp4VlwKICAgICAgRzF4WlU1bmFEUXpPRVo1UzNOMlNsWjVZelkwWlFwQ1RrWTRPRnBzSzNseGFVWnVjRW8yTDBJNFpsVlNkemhSVURVd2JrcGlVMUp1YVwKICAgICAgemd4UlVGdmVrRXlNVGxZUTBjclRIbFROMncwYlU4eE1FNWtjMlZ6Q2s5TFJFNHJUVFJIZEhaTE1IcEpOakZLVEVSemVUaHFTMjlRVFwKICAgICAgV0pETTI5bmVHb3pZMVJMVEc5Wk9FY3dlRkpuWTBod2NETnJOWFZHUVhrNVRUaEpXVW9LTUROVGRqbENSMUo0YzNwUlQxSmxXbnAxY1wKICAgICAgM1JPTDNOUk9XMDJkMEphUTFSUlExUmtWRWM1UVdaTWJWSmpZekE0Y2xCVFRVVnJiV1JQVGxsYVkyaFRSd3A2UVc1b1VFWXplVzlSTFwKICAgICAgMWxMYlROdVQzWkVhbTB2S3pSNVprZDVSVGQzU0hGNlZXUkZibkIxZERoaE1VbDBOV2hCVm1NOUNpMHRMUzB0UlU1RUlFTkZVbFJKUlwKICAgICAga2xEUVZSRkxTMHRMUzBLIgoKdXNlcnM6Ci0gbmFtZTogInUtOXZxNXgiCiAgdXNlcjoKICAgIHRva2VuOiAia3ViZWNvbmZpZy11LTl2cTV4LmMtaHByNXc6d2JuMnZibHRwZmxqOTZyaGcya2Y3Zm1xbThrZnJzbDk0NnJrNGdoMmZ3anhicG10aDhrMmxoIgoKY29udGV4dHM6Ci0gbmFtZTogInRnaS1oZXR6bmVyIgogIGNvbnRleHQ6CiAgICB1c2VyOiAidS05dnE1eCIKICAgIGNsdXN0ZXI6ICJ0Z2ktaGV0em5lciIKLSBuYW1lOiAidGdpLWhldHpuZXItcmFuY2hlciIKICBjb250ZXh0OgogICAgdXNlcjogInUtOXZxNXgiCiAgICBjbHVzdGVyOiAidGdpLWhldHpuZXItcmFuY2hlciIKCmN1cnJlbnQtY29udGV4dDogInRnaS1oZXR6bmVyIgo=" 
# docker build -t smktesting/create-smktest:latest --build-arg KUBERNETES_TOKEN=$KUBERNETES_TOKEN -f Dockerfile .
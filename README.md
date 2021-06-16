# Smoke Master

Service to run automated Smoke testing in cluster kubernetes from Pipelines. It can be run 100% from the gitlab pipeline

## Build Image steps

    1. Login with:
        docker login --username $DOCKER_USER -p $DOCKER_TOKEN
    2. Build base imagen:
        docker build -t smktesting/smoke-master:latest -f Dockerfile .
    3. docker push smktesting/smoke-master:latest

## Table of Commands Smoke-Master:

| Console command                | Environment Variable                 | Default | Environment Variable                                   |
| :----------------------------- | :----------------------------------- | :------ | :----------------------------------------------------- |
| --check-endpoints              | SMKTEST_CHECK_INGRESS                | false   | Verify that the income is available and without errors |
| --check-if-all-pods-are-active | SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE | false   | Check if all pods are active                           |
| --check-conditions             | SMKTEST_CHECK_CONDITIONS             | false   | Check cluster condition                                |

## Check Ingress.

#### Command Kubectl:

    kubectl get ingress --namespace=NAME_SPACE -o json

#### Command smoke-master:

    --check-ingress

#### Example:

    create-smktest --check-ingress=true

#### Gitlab Pipeline example:

#### Example how connect one remote cluster

    checkIngress:
    image:
        name: registry.gitlab.com/phdactivities/smoke-master:master
    stage: kubernetes
    variables:
        SMKTEST_PROJECT_NAME: 'SmokeMaster'
        SMKTEST_ENVIRONMENT: 'master'
        SMKTEST_CONTEXT: 'kubernetes'
        SMKTEST_NAMESPACE: 'nodespace'
        SMKTEST_MODE_AUTO: 'true'
    script:
        # Create cluster remote configuration file.
        - echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
        - create-smktest --check-ingress=true
    only:
        - master

## Check if all pods are Active:

### Descriptions:

Verify if all Pods are running and are active

### Gitlab pipeline example:

    podsActive:
    image:
        name: registry.gitlab.com/phdactivities/smoke-master:master
    stage: kubernetes
    variables:
        SMKTEST_PROJECT_NAME: 'SmokeMaster'
        SMKTEST_ENVIRONMENT: 'master'
        SMKTEST_CONTEXT: 'kubernetes'
        SMKTEST_NAMESPACE: 'nodespace'
        SMKTEST_MODE_AUTO: 'true'
    script:
        # Create cluster remote configuration file.
        - echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
        - create-smktest --check-if-all-pods-are-active=true
    only:
        - master

## Check Conditions.

This command checks that those that do not exist alert in the cluster. These alerts can cause instability in all the nodes involved.

#### Command Kubectl:

    kubectl describe nodes


      Type             Status  LastHeartbeatTime                 LastTransitionTime                Reason                       Message
    ----             ------  -----------------                 ------------------                ------                       -------
    MemoryPressure   False   Wed, 16 Jun 2021 13:48:07 +0200   Thu, 26 Sep 2019 12:13:47 +0200   KubeletHasSufficientMemory   kubelet has sufficient memory available
    DiskPressure     False   Wed, 16 Jun 2021 13:48:07 +0200   Mon, 01 Mar 2021 18:01:45 +0100   KubeletHasNoDiskPressure     kubelet has no disk pressure
    PIDPressure      False   Wed, 16 Jun 2021 13:48:07 +0200   Thu, 26 Sep 2019 12:13:47 +0200   KubeletHasSufficientPID      kubelet has sufficient PID available
    Ready            True    Wed, 16 Jun 2021 13:48:07 +0200   Tue, 08 Jun 2021 14:12:12 +0200   KubeletReady                 kubelet is posting ready status

#### Command smoke-master:

    --check-context

#### Example:

    create-smktest --check-context=true

#### Gitlab Pipeline example:

    contextNode:
    image:
        name: registry.gitlab.com/phdactivities/smoke-master:master
    stage: kubernetes
    variables:
        SMKTEST_PROJECT_NAME: 'SmokeMaster'
        SMKTEST_ENVIRONMENT: 'master'
        SMKTEST_CONTEXT: 'kubernetes'
        SMKTEST_NAMESPACE: 'nodespace'
        SMKTEST_MODE_AUTO: 'true'
    script:
        # Create cluster remote configuration file.
        - echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
        - create-smktest --check-context=true
    only:
        - master

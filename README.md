# Smoke Master

Smoke Master is a service dedicated to conducting smoke testing on kubernetes pipelines. It does not require any configuration in the cluster. The service accesses the cluster by SSH performs the tests and then is automatically destroyed, which makes it totally secure.
The smoke tests focus on validating the stability of the cluster. It is highly recommended when combining multiple projects in a single kubernetes server.It can be run 100% from the gitlab pipeline.

#### Example how to use the smoke-test structure inside of one pipeline:

It is recommended to use a first test to validate the conditions of the cluster as shown in the example with the step "checkCluster" This will check that the cluster is in proper conditions

![toolss_500px](docs/examplePipeline.png)

The rest of the test cases can be applied right after the deployment of the service. This will help verify that the system is in proper condition before executing other types of tests.

# Functional tests (BACKEND)

## Build Image steps

    1. Login with:
        docker login --username $DOCKER_USER -p $DOCKER_TOKEN
    2. Build base imagen:
        docker build -t smktesting/smoke-master:latest -f Dockerfile .
    3. docker push smktesting/smoke-master:latest

## Table of Commands Smoke-Master:

| Console command                | Environment Variable                 | Context    | Environment Variable                                   |
| :----------------------------- | :----------------------------------- | :--------- | :----------------------------------------------------- |
| --check-endpoints              | SMKTEST_CHECK_INGRESS                | Kubernetes | Verify that the income is available and without errors |
| --check-if-all-pods-are-active | SMKTEST_CHECK_IF_ALL_PODS_ARE_ACTIVE | Kubernetes | Check if all pods are active                           |
| --check-conditions             | SMKTEST_CHECK_CONDITIONS             | Kubernetes | Check cluster condition (MemoryPressure, PIDPressure)  |
| --check-pods-logs              | SMKTEST_CHECK_PODS_LOGS              | Kubernetes | Check if exist logs error inside of Pods               |
| --assert-curl                  | SMKTEST_ASSERT_CURL                  | all        | Check respose using Curl petitions                     |
| --check-ingress                | SMKTEST_CHECK_INGRESS                | Kubernetes | Check ingress and load balancer                        |

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

    --check-conditions

#### Example:

    create-smktest --check-conditions=true

#### Gitlab Pipeline example:

    conditionsCluster:
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
        - create-smktest --check-conditions=true
    only:
        - master

## Check Logs Inside of the Pods.

#### Command Kubectl:

    kubectl logs ${name} --namespace=${namespace} --since=2m

#### Example:

    create-smktest --project-name=test --environment=develop --context=kubernetes --namespace=smokeMaster --mode-auto=true --check-pods-logs=true

#### Gitlab Pipeline example:

    logsPods:
    image:
        name: registry.gitlab.com/phdactivities/smoke-master:master
    stage: kubernetes
    variables:
        SMKTEST_PROJECT_NAME: 'SmokeMaster'
        SMKTEST_ENVIRONMENT: 'master'
        SMKTEST_CONTEXT: 'kubernetes'
        SMKTEST_NAMESPACE: 'edutelling-develop'
        SMKTEST_MODE_AUTO: 'true'
    script:
        # Create cluster remote configuration file.
        - echo $KUBERNETES_TOKEN | base64 -d > /etc/deploy/config
        - create-smktest --check-pods-logs=true
    only:
        - master

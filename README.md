# Portfolio Website Deployment on Kubernetes

## Project Overview

This project demonstrates how to containerize and deploy a personal portfolio website using Docker and Kubernetes.

The website was packaged into a Docker image and deployed on a Kubernetes cluster running on Kind. Kubernetes components such as Deployments, ReplicaSets, Services, and Ingress were used to provide scalability, networking, and self-healing capabilities.

## Architecture

Portfolio Website

↓

Docker Image

↓

Kubernetes Deployment

↓

ReplicaSet

↓

Portfolio Pods (2 Replicas)

↓

Service (ClusterIP)

↓

Ingress

↓

User Traffic

## Technologies Used

* Docker
* Kubernetes
* Kind
* NGINX Ingress Controller
* HTML
* CSS
* JavaScript

## Project Workflow

Create the portfolio website using HTML, CSS, and JavaScript.

Containerize the application using Docker.

Build a Docker image for the portfolio website.

Load the image into the Kind Kubernetes cluster.

Create a Kubernetes Deployment with multiple replicas.

Create a Service to provide a stable endpoint.

Create an Ingress resource to route external traffic.

Verify application availability through Pods, Services, and Ingress.

## Implementation Steps

### Step 1: Create Portfolio Website

Created a responsive portfolio website using:

* HTML
* CSS
* JavaScript

### Step 2: Containerize the Application

Created a Dockerfile.

Built the Docker image:

```bash
docker build -t portfolio:v1 .
```

### Step 3: Load Image into Kubernetes Cluster

Loaded the image into the Kind cluster:

```bash
kind load docker-image portfolio:v1 --name cib-cluster
```

### Step 4: Create Kubernetes Deployment

Created a Deployment with 2 replicas.

Applied Deployment:

```bash
kubectl apply -f portfolio-deployment.yaml
```

Verified Deployment:

```bash
kubectl get deployments
```

### Step 5: Create Kubernetes Service

Created a ClusterIP Service.

Applied Service:

```bash
kubectl apply -f portfolio-service.yaml
```

Verified Service:

```bash
kubectl get svc
```

### Step 6: Configure Ingress

Created an Ingress resource to route traffic.

Applied Ingress:

```bash
kubectl apply -f portfolio-ingress.yaml
```

Verified Ingress:

```bash
kubectl get ingress
```

### Step 7: Verify Kubernetes Resources

Checked Deployments:

```bash
kubectl get deployments
```

Checked Pods:

```bash
kubectl get pods
```

Checked Services:

```bash
kubectl get svc
```

Checked Ingress:

```bash
kubectl get ingress
```

## Added Screenshots

### Portfolio Website Running

Screenshot showing the deployed portfolio website.

### Kubernetes Deployment

Screenshot showing Deployment status.

### Kubernetes Pods

Screenshot showing running Pods.

### Kubernetes Ingress

Screenshot showing Ingress routing configuration.

## Key Learnings

* Docker containerization
* Kubernetes Deployments
* ReplicaSets and desired state management
* Pod lifecycle management
* Kubernetes Services and networking
* Ingress routing
* Self-healing architecture
* Application deployment workflow
* Container orchestration fundamentals

## Skills Demonstrated

* Docker
* Kubernetes
* Kind
* NGINX Ingress
* Containerization
* Infrastructure Management
* Service Networking
* Deployment Automation
* Troubleshooting
* Linux

## Future Improvements

* Deploy the application on AWS EKS
* Configure a custom domain
* Implement TLS/HTTPS
* Add CI/CD using GitHub Actions
* Deploy using Helm Charts
* Add monitoring using Prometheus and Grafana

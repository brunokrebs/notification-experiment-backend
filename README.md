# Notification Experiment

Backend:

```bash
docker build -t notification-experiment-backend .

docker run -e "INSTANCE_ID=First instance" \
  -p 9501:3000 \
   --name notification-experiment-backend-1 \
  -d notification-experiment-backend

docker run -e "INSTANCE_ID=Second instance" \
  -p 9502:3000 \
   --name notification-experiment-backend-2 \
  -d notification-experiment-backend
```

NGINX load balancer:

```bash
cd nginx-load-balancer

docker build -t nginx-load-balancer .

docker run \
  -p 9500:80 \
  --name notification-experiment-load-balancer \
  -d nginx-load-balancer
```

## Localstack SQS

References:

- https://github.com/localstack/localstack
- https://www.linkedin.com/pulse/using-localstack-test-sqs-sns-fabio-palumbo/?articleId=6653638519531073536

```bash
export SERVICES=sqs,sns

localstack start
```

Create queue:

```bash
aws --endpoint-url=http://localhost:4566 sqs create-queue --region us-east-1 --queue-name notification-experiment-queue
```

Output:

```
{
    "QueueUrl": "http://localhost:4566/000000000000/notification-experiment-queue"
}
```

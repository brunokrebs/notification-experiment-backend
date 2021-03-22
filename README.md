# Notification Experiment

Backend:

```bash
docker build -t notification-experiment-backend .

docker run -e "INSTANCE_ID=First instance" -p 8081:3000 -d notification-experiment-backend
docker run -e "INSTANCE_ID=Second instance" -p 8082:3000 -d notification-experiment-backend
```

NGINX load balancer:

```bash
cd nginx-load-balancer

docker build -t nginx-load-balancer .

docker run -p 8080:80 -d nginx-load-balancer
```
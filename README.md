# Notification Experiment

```bash
docker build -t notification-experiment-backend .

docker run -e "INSTANCE_ID=First instance" -p 8081:3000 -d notification-experiment-backend
docker run -e "INSTANCE_ID=Second instance" -p 8082:3000 -d notification-experiment-backend
```

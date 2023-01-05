FROM python:3.9

RUN apt-get update
RUN apt-get install nano

WORKDIR /app

COPY . /app

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ARG APP=federation_model
ARG PORT=8080

EXPOSE $PORT

CMD if [ "$APP" = "federation_model" ]; then \
  python federation_model/server.py $PORT; \
  elif [ "$APP" = "cluster_model" ]; then \
  python cluster_model/server.py $PORT; \
  else \
  echo "Invalid APP"; \
  fi
FROM r-base:3.6.3

RUN apt-get update

WORKDIR /app

COPY . /app

RUN apt-get install -y \
  libssl-dev \
  libsodium-dev \
  libcurl4-openssl-dev \
  libxml2-dev

RUN R -e "source('r_model/requirements.R')"

ARG PORT=8080

EXPOSE $PORT

# ENTRYPOINT ["R", "-e", "source('r_model/server.R'); library(plumber); pb <- pr('r_model/plumber.R'); pr_run(port=${PORT}, host='0.0.0.0', pr=pb)"]
CMD R -e "source('r_model/server.R'); library(plumber); pb <- pr('r_model/plumber.R'); pr_run(port=${PORT}, host='0.0.0.0', pr=pb)"
FROM r-base:3.6.3

RUN apt-get update

WORKDIR /app

COPY . /app

RUN apt-get update -qq && apt-get install -y \
  libssl-dev \
  libsodium-dev \
  libcurl4-openssl-dev \
  libxml2-dev

RUN R -e "source('r_model/requirements.R')"

ARG PORT=8000

EXPOSE $PORT

# CMD Rscript r_model/server.R $PORT; \
# ENTRYPOINT ["R", "-e", "source('r_model/server.R')"]
ENTRYPOINT ["Rscript", "r_model/server.R"]
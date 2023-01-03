FROM R:3.6.3

RUN apt-get update

WORKDIR /app

COPY . /app

RUN Rscript r_model/install.R

ARG PORT=8080

EXPOSE $PORT

CMD Rscript r_model/server.R $PORT; \
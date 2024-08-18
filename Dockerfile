FROM ubuntu:22.04

RUN dpkg --configure -a

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
    gcc g++ mono-mcs curl wget openjdk-21-jdk \
    python3 python3-pip nodejs npm

ENV GOROOT=/usr/local/go
ENV PATH=$PATH:$GOROOT/bin

RUN wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz && \
    rm -rf /usr/local/go && \
    tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz

ENV NODE_VERSION=16.13.2
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
# RUN nvm install 16.13.2

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]

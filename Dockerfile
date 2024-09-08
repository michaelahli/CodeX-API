FROM ubuntu:22.04

RUN dpkg --configure -a

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y --no-install-recommends curl wget \
    gcc g++ mono-mcs openjdk-21-jdk \
    nodejs npm

RUN apt install software-properties-common -y
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt install python3.12 python3.12-venv -y
RUN rm /usr/bin/python3 && ln -s /usr/bin/python3.12 /usr/bin/python3
RUN python3 -m ensurepip --upgrade

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

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
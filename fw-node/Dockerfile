FROM resin/raspberry-pi2-node:9-slim

WORKDIR /gwhp

COPY package.json .
COPY config.json .
COPY src src/

RUN [ "cross-build-start" ]
RUN npm install
RUN [ "cross-build-end" ]

CMD [ "node", "--inspect=0.0.0.0:9229", "src/main.js" ]

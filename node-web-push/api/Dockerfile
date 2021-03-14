FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN chmod u+x entrypoint.sh

CMD ["bash", "./entrypoint.sh"]

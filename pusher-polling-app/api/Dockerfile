FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN chmod u+x entrypoint.sh
EXPOSE 8000

CMD ["bash", "./entrypoint.sh"]

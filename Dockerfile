FROM drupalci/sqlite-3:production
RUN apk add nodejs npm
WORKDIR /app
COPY . .
RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
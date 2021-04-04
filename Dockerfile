FROM strapi/base:12-alpine

# create destination directory
RUN mkdir -p /opt/app-root/src
WORKDIR /opt/app-root/src

# copy the npm packages and install all dependencies
COPY [ "package.json", "yarn.lock", "./" ]
RUN yarn install --production

# copy the app, note .dockerignore
COPY . ./

# run with the production settings
ENV NODE_ENV production

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN yarn build

EXPOSE 1337

CMD [ "yarn", "start" ]

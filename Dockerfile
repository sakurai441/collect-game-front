# FROM node:14-alpine
# WORKDIR /front
# COPY ./ /front
# RUN npm install

FROM node:16-alpine
WORKDIR /front
COPY ./ /front
RUN npm install --legacy-peer-deps
# RUN rm -rf node_modules \
#   && rm package-lock.json \
#   && npm cache clear --force \
#   && npm cache clean --force \
#   && npm i

# ENV NODE_ENV=production
RUN npm run build
EXPOSE 8000
CMD ["npm", "run", "start"]
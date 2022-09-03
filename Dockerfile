# base node image
FROM --platform=linux/amd64 node:18 as base

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Install all node_modules, including dev dependencies
FROM --platform=linux/amd64 base as deps

WORKDIR /myapp

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM --platform=linux/amd64 base as production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM --platform=linux/amd64 base as build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

ADD prisma .
ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
RUN npx prisma generate

ADD . .
RUN npm run postinstall
RUN npm run build

# Run migrations
ARG DATABASE_URL
# RUN npm run deploy:db

# Finally, build the production image with minimal footprint
FROM --platform=linux/amd64 base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma

COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
ADD . .

CMD ["npm", "start"]
# Build image

FROM node:20 AS build

ARG CONTAINER_NAME
ENV CONTAINER_NAME=$CONTAINER_NAME

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Deploy image

FROM node:20-slim AS deploy

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/pnpm-lock.yaml ./

EXPOSE 4173

CMD ["pnpm", "start", "--host"]

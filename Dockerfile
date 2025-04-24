# Build image

FROM node:20 AS build

RUN apt-get update && apt-get install -y git --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN npm install -g pnpm

WORKDIR /app

RUN git clone https://github.com/CALLmeDOMIN/traffic_lights.git .

RUN pnpm install --frozen-lockfile

RUN pnpm build

# Deploy image

FROM node:20-slim AS deploy

RUN npm install -g pnpm

WORKDIR /app

COPY --from=build /app/node_modules/ ./node_modules

COPY --from=build /app/dist ./dist

COPY --from=build /app/package.json /app/pnpm-lock.yaml .

EXPOSE 4173

CMD ["pnpm", "exec", "vite", "preview", "--host"]

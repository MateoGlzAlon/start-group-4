# Builds the static Next.js export and serves it with nginx.
# Stages: deps (also used by `make dev`) -> test -> build -> nginx.

FROM node:24-alpine AS deps
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# The image only builds if every step cites an official source.
FROM deps AS test
COPY . .
RUN npm test

FROM test AS build
RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80

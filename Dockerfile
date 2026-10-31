FROM node:22-alpine

WORKDIR /app

# Source is bind-mounted at runtime and node_modules lives in a named
# volume (see ../erp-laravel/docker-compose.yml), so dependencies are
# installed on start: `npm install` is a quick no-op when nothing changed.
EXPOSE 5173
CMD ["sh", "-c", "npm install && exec npm run dev -- --host 0.0.0.0 --port 5173"]

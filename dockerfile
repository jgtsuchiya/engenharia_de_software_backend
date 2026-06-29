# ---------- Stage 1: Builder ----------
FROM node:22-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json* ./

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm ci

# Copia o código fonte e o tsconfig
COPY tsconfig.json ./
COPY src/ ./src/

# Compila o TypeScript -> dist/
RUN npx tsc

# ---------- Stage 2: Production ----------
FROM node:22-alpine

WORKDIR /app

# Apenas dependências de produção
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copia o código compilado do estágio anterior
COPY --from=builder /app/dist ./dist

# Opcional: copie arquivos estáticos se houver (ex: templates, public)
# COPY --from=builder /app/src/public ./public

# Variáveis de ambiente (ajuste conforme necessário)
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE ${PORT}

RUN apk add --no-cache netcat-openbsd
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

CMD ["/app/entrypoint.sh"]

# syntax=docker.io/docker/dockerfile:1
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---------- deps：只安裝依賴，最大化快取 ----------
FROM base AS deps
WORKDIR /app
# 複製會影響相依的檔案：根 package* + app 的 package*
COPY package.json package-lock.json* ./
COPY apps/agri-frontend2/package.json ./apps/agri-frontend2/package.json
COPY nx.json ./
COPY tsconfig*.json ./
RUN npm ci

WORKDIR /app/apps/agri-frontend2
RUN npm ci

# ---------- builder：建置 Next ----------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# 帶入建置所需的原始碼與設定
COPY . .
RUN npx nx run agri-frontend2:build

# ---------- runner：最小執行映像 ----------
FROM node:20-alpine AS runner
WORKDIR /app

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
USER nextjs

# 輸出
COPY --from=builder /app/apps/agri-frontend2/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/agri-frontend2/.next/standalone/ ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/agri-frontend2/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/agri-frontend2/.next/static ./apps/agri-frontend2/.next/static


ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000


CMD ["node", "apps/agri-frontend2/server.js"]

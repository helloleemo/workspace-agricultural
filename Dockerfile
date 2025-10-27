

# ------- base stage -------
FROM node:20-alpine AS base

# ------- deps stage -------
FROM base AS deps

# Prisma的套件所需/sslmode=require
RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

# Copy 檔案
COPY package*.json ./
COPY apps/agri-frontend/package.json ./apps/agri-frontend/
COPY prisma ./prisma/

# 安裝套件，使用 --legacy-peer-deps 依據lock安裝，忽略peer衝突
RUN npm ci --legacy-peer-deps

# ------- builder stage -------
FROM base AS builder
WORKDIR /app

# 從deps階段複製node_modules
COPY --from=deps /app/node_modules ./node_modules
# 複製其他程式的部分
COPY . .

# Generate Prisma client
RUN npx prisma generate
# Build the Next.js application using Nx
RUN npx nx build agri-frontend

# ------- runner stage -------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Add non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy Prisma files and generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma

# Copy the Next.js build output
COPY --from=builder /app/dist/apps/agri-frontend/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/agri-frontend/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/dist/apps/agri-frontend/.next/static ./dist/apps/agri-frontend/.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the server using the Next.js standalone server
CMD ["node", "dist/apps/agri-frontend/server.js"]
# ---------- Этап 1: Base (Общая база) ----------
FROM node:22-alpine AS base
WORKDIR /app
# libc6-compat нужен для корректной работы некоторых нативных зависимостей Node.js в Alpine
RUN apk add --no-cache libc6-compat

# ---------- Этап 2: Dependencies (Установка зависимостей) ----------
FROM base AS deps
WORKDIR /app

# Копируем файлы манифестов
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Универсальная установка с поддержкой pnpm и строгой проверкой локфайла
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Error: Lockfile not found. Locking dependencies is required for production!" && exit 1; \
  fi

# ---------- Этап 3: Builder (Сборка приложения) ----------
FROM base AS builder
WORKDIR /app

# Копируем установленные node_modules из этапа deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ФИКС ДЛЯ ПАРСИНГА: Гарантируем наличие cheerio (часто выпадает из standalone билда)
RUN npm install cheerio

# Аргументы сборки (Build-time variables)
ARG NEXT_PUBLIC_TMDB_TOKEN
ARG NEXT_PUBLIC_RAWG_API
ARG NEXT_PUBLIC_YOUTUBE_API_KEY
ARG BASE_URL

# Прокидываем их в ENV, чтобы Next.js вшил их в клиентский бандл
ENV NEXT_PUBLIC_TMDB_TOKEN=$NEXT_PUBLIC_TMDB_TOKEN \
  NEXT_PUBLIC_RAWG_API=$NEXT_PUBLIC_RAWG_API \
  NEXT_PUBLIC_YOUTUBE_API_KEY=$NEXT_PUBLIC_YOUTUBE_API_KEY \
  NEXT_PUBLIC_GROQ_API_KEY=$NEXT_PUBLIC_GROQ_API_KEY \
  BASE_URL=$BASE_URL \
  NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1

# Сборка проекта
RUN npm run build

# ---------- Этап 4: Runner (Финальный образ) ----------
FROM node:22-alpine AS runner
WORKDIR /app

# Настройки окружения для рантайма
ENV NODE_ENV=production \
  NEXT_TELEMETRY_DISABLED=1 \
  PORT=3000 \
  HOSTNAME="0.0.0.0"

# КРИТИЧЕСКИЙ ФИКС ДЛЯ YOUTUBE: Принудительный приоритет IPv4.
# Предотвращает таймауты и ошибки при запросах к Google/YouTube API внутри Docker-контейнеров.
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

# Создаем системного пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 nextjs

# Копируем только необходимые файлы (используем standalone режим Next.js)
COPY --from=builder /app/public ./public

# Настройка прав для кэша и работы сервера
RUN mkdir .next && chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
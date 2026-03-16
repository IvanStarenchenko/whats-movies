#!/usr/bin/env bash
# build.sh — запускать на ПК для сборки и пуша образа с запечёнными ключами
set -euo pipefail

# Читаем переменные из .env.local
if [ ! -f .env.local ]; then
  echo "❌ Файл .env.local не найден!" >&2
  exit 1
fi

set -o allexport
source .env.local
set +o allexport

IMAGE="tymurmustafaiev/whats-movies:latest"

echo "🔨 Собираю образ: $IMAGE"
echo "   TMDB: ${NEXT_PUBLIC_TMDB_TOKEN:0:20}..."

docker build \
  --build-arg NEXT_PUBLIC_TMDB_TOKEN="$NEXT_PUBLIC_TMDB_TOKEN" \
  --build-arg NEXT_PUBLIC_RAWG_API="$NEXT_PUBLIC_RAWG_API" \
  --build-arg NEXT_PUBLIC_YOUTUBE_API_KEY="$NEXT_PUBLIC_YOUTUBE_API_KEY" \
  --build-arg BASE_URL="$BASE_URL" \
  -t "$IMAGE" \
  .

echo "🚀 Пушу образ в Docker Hub..."
docker push "$IMAGE"

echo "✅ Готово! Образ с запечёнными ключами опубликован: $IMAGE"
echo "   На сервере выполни: docker compose pull && docker compose up -d"

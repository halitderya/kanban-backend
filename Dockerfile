FROM node:19.5.0-alpine

# Çalışma dizinini belirle
WORKDIR /app

# API anahtarını argüman olarak al
ARG API_KEY

# Çevre değişkenine API anahtarını ata
ENV API_KEY=$API_KEY

# Uygulama dosyalarını konteynerin çalışma dizinine kopyala
COPY . .

# Bağımlılıkları yükle
RUN npm install

# Uygulamayı build et
RUN npm run build

# Uygulamayı başlat
CMD ["npm", "start"]

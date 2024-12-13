#Etapa 1: Construcción
#Obtener la imagen de la versión de Node.js a utilizar:
FROM node:22-alpine AS builder

#Nombre para el directorio:
WORKDIR /app

#Obtener las dependencias a instalar:
COPY package*.json ./

#Instalarlas:
RUN npm install 

#Copia todo el código del proyecto:
COPY . . 

#Compila el código TypeScript:
RUN npm run build

#Asegura que el directorio de destino existe antes de copiar los archivos .graphql:
RUN mkdir -p ./dist/src/graphql && cp -r ./src/graphql ./dist/src/graphql

#Etapa 2: Producción
FROM node:22-alpine
WORKDIR /app

#Entorno de producción:
ENV NODE_ENV=production

#Copiar archivos necesarios para levantar el servicio:
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

#Puerto donde ejecuta:
EXPOSE 3000

#Comando para ejecutar el servicio:
CMD ["node", "dist/main"]
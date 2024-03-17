# build environment
FROM node:13.11.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . ./
RUN npm run build pruebas-pruebas

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY E64EBC3EA6E1D8DA7E9E2AEB2B6C2A1A.txt /usr/share/nginx/html/.well-known/pki-validation/E64EBC3EA6E1D8DA7E9E2AEB2B6C2A1A.txt
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
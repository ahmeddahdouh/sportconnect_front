# Étape 1 : Utiliser l'image officielle de Node.js
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . ./

# Exposer le port 3000 (par défaut pour React en développement)
EXPOSE 3000

# Lancer le serveur de développement React
CMD ["npm", "start"]

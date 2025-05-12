# Dockerfile
FROM node:22

# Install OpenJDK 17 (needed for Firestore emulator)
RUN apt-get update && apt-get install -y openjdk-17-jre-headless

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install Firebase CLI 
RUN npm install -g firebase-tools

# Install and build backend (functions)
RUN cd functions && npm ci && npm run build

# Install and build frontend (admin)
RUN cd admin && npm ci && npm run build

# Expose Firebase emulator ports 
EXPOSE 5000 5001 5002 5003 5004 5005 5006 5007 9150

# Default command
CMD ["firebase", "emulators:start"]

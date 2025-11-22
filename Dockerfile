# Use a specific LTS version, not "latest"
FROM node:25.2.0-alpine

# Create app directory
WORKDIR /usr/src/verification-bot

# Install dependencies using the lockfile for reproducible builds
COPY /src/package.json /src/package-lock.json ./
RUN npm ci --only=production

# Copy source code
COPY src ./src

# Create a non-root user and change ownership
RUN addgroup -S app && adduser -S -G app app \
  && chown -R app:app /usr/src/verification-bot

USER app

# Set NODE_ENV default inside container (can be overridden from outside)
ENV NODE_ENV=production

# Start the bot
CMD ["node", "src/index.js"]


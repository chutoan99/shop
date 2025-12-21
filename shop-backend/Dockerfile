FROM node:20-alpine

# Cài đặt curl và bash
RUN apk add --no-cache curl bash

# Cài đặt Bun
RUN curl -fsSL https://bun.sh/install | bash

# Thiết lập đường dẫn cho Bun
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /node
COPY package*.json ./

# Cài đặt dependencies với Bun
RUN bun install

COPY . .
RUN bun run build

EXPOSE 9999
CMD ["npm", "run", "start"]

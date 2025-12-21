# Stage 1: Build stage
FROM maven:3.9.4-eclipse-temurin-17 as builder

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy project source code
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM eclipse-temurin:17-jdk

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod

# Set working directory
WORKDIR /app

# Copy the built jar file from the builder stage
COPY --from=builder /app/target/admin-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080 for the application
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

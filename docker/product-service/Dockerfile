# ============================
# Stage 1 : Build
# ============================
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy common-events
COPY backend/common-events ./common-events

# Build and install common-events
WORKDIR /build/common-events
RUN mvn clean install -DskipTests

# Copy product-service
WORKDIR /build
COPY backend/product-service ./product-service

# Build product-service
WORKDIR /build/product-service
RUN mvn clean package -DskipTests


# ============================
# Stage 2 : Runtime
# ============================
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /build/product-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","app.jar"]
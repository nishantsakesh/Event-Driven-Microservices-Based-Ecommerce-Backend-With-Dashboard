# ============================
# Stage 1 : Build
# ============================
FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

COPY backend/discovery-server ./discovery-server

WORKDIR /build/discovery-server
RUN mvn clean package -DskipTests

# ============================
# Stage 2 : Runtime
# ============================
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /build/discovery-server/target/*.jar app.jar

EXPOSE 8761

ENTRYPOINT ["java", "-jar", "app.jar"]

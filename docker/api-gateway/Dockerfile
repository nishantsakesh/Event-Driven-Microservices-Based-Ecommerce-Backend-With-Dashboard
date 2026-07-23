FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

COPY backend/api-gateway ./api-gateway

WORKDIR /build/api-gateway
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /build/api-gateway/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]
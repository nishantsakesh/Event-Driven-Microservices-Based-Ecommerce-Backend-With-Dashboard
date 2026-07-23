FROM maven:3.9.9-eclipse-temurin-21 AS builder

WORKDIR /build

COPY backend/common-events ./common-events

WORKDIR /build/common-events
RUN mvn clean install -DskipTests

WORKDIR /build

COPY backend/order-service ./order-service

WORKDIR /build/order-service
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /build/order-service/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java","-jar","app.jar"]
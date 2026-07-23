//package com.ecommerce.api_gateway.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//                .csrf(csrf -> csrf.disable())
//
//                .authorizeHttpRequests(auth -> auth
//
//                        // Public endpoints
//                        .requestMatchers(
//                                "/api/auth/**"
//                        ).permitAll()
//
//                        // Product browsing
//                        .requestMatchers(
//                                HttpMethod.GET,
//                                "/api/products/**"
//                        ).permitAll()
//
//                        // Everything else requires authentication
//                        .anyRequest().authenticated()
//                )
//
//                /*
//                 * Replace this with JWT authentication later:
//                 *
//                 * .oauth2ResourceServer(oauth ->
//                 *      oauth.jwt(Customizer.withDefaults()))
//                 */
//
//                .httpBasic(Customizer.withDefaults());
//
//        return http.build();
//    }
//}


package com.ecommerce.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
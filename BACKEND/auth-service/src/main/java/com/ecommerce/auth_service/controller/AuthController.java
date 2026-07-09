package com.ecommerce.auth_service.controller;

import com.ecommerce.auth_service.dto.*;
import com.ecommerce.auth_service.security.JwtService;
import com.ecommerce.auth_service.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public RegisterResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @GetMapping("/profile")
    public ProfileResponse profile(Principal principal) {
        return authService.getProfile(
                principal.getName()
        );
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validate(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body(Map.of("valid", false));
        }

        String token = authHeader.substring(7);

        if (jwtService.validateToken(token)) {
            return ResponseEntity.ok(Map.of(
                    "valid", true,
                    "email", jwtService.extractEmail(token)
            ));
        }

        return ResponseEntity.status(401).body(Map.of("valid", false));
    }
}
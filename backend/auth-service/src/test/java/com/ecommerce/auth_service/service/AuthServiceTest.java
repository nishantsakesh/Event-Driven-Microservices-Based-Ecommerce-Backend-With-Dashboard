package com.ecommerce.auth_service.service;

import com.ecommerce.auth_service.dto.*;
import com.ecommerce.auth_service.entity.Role;
import com.ecommerce.auth_service.entity.User;
import com.ecommerce.auth_service.repository.UserRepository;
import com.ecommerce.auth_service.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    private User sampleUser;

    @BeforeEach
    void setUp() {
        sampleUser = User.builder()
                .id(1L)
                .name("Nishant")
                .email("nishant@example.com")
                .password("encodedPassword123")
                .role(Role.USER)
                .build();
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void testRegister_Success() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Nishant");
        request.setEmail("newuser@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword123");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        RegisterResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("User Registered Successfully", response.getMessage());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("Should throw exception when registering with already existing email")
    void testRegister_EmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Nishant");
        request.setEmail("nishant@example.com");
        request.setPassword("password123");

        when(userRepository.existsByEmail("nishant@example.com")).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.register(request));
        assertEquals("Email already exists", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("Should successfully login with valid credentials")
    void testLogin_Success() {
        LoginRequest request = new LoginRequest();
        request.setEmail("nishant@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("nishant@example.com")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("password123", "encodedPassword123")).thenReturn(true);
        when(jwtService.generateToken(sampleUser)).thenReturn("mocked.jwt.token");
        when(userRepository.save(any(User.class))).thenReturn(sampleUser);

        LoginResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("nishant@example.com", response.getEmail());
        assertEquals("mocked.jwt.token", response.getToken());
    }

    @Test
    @DisplayName("Should throw exception when login user does not exist")
    void testLogin_UserNotFound() {
        LoginRequest request = new LoginRequest();
        request.setEmail("nonexistent@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("User Not Found", exception.getMessage());
    }

    @Test
    @DisplayName("Should throw exception when login password is invalid")
    void testLogin_InvalidPassword() {
        LoginRequest request = new LoginRequest();
        request.setEmail("nishant@example.com");
        request.setPassword("wrongpassword");

        when(userRepository.findByEmail("nishant@example.com")).thenReturn(Optional.of(sampleUser));
        when(passwordEncoder.matches("wrongpassword", "encodedPassword123")).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> authService.login(request));
        assertEquals("Invalid Password", exception.getMessage());
    }

    @Test
    @DisplayName("Should return user profile by email")
    void testGetProfile_Success() {
        when(userRepository.findByEmail("nishant@example.com")).thenReturn(Optional.of(sampleUser));

        ProfileResponse profile = authService.getProfile("nishant@example.com");

        assertNotNull(profile);
        assertEquals("Nishant", profile.getName());
        assertEquals("nishant@example.com", profile.getEmail());
        assertEquals("USER", profile.getRole());
    }
}

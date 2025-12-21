package com.demo.admin.modules.auth.controllers;

import com.demo.admin.modules.auth.dtos.LoginUserDto;
import com.demo.admin.modules.auth.dtos.RegisterUserDto;
import com.demo.admin.modules.auth.services.AuthService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {
    private final AuthService _authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterUserDto input) {
        return _authService.register(input);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginUserDto input) {
        return _authService.login(input);
    }
}
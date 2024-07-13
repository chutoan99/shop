package com.demo.admin.modules.auth;

import com.demo.admin.modules.auth.dtos.LoginUserDto;
import com.demo.admin.modules.auth.dtos.RegisterUserDto;
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
    private final AuthService authService;
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody RegisterUserDto input) {
        return authService.signup(input);
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticate(@RequestBody LoginUserDto input) {
        return authService.signin(input);
    }
}
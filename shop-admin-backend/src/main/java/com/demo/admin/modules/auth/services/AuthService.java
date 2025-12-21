package com.demo.admin.modules.auth.services;

import lombok.AllArgsConstructor;
import java.util.Map;
import java.util.Optional;

import com.demo.admin.modules.auth.dtos.LoginUserDto;
import com.demo.admin.modules.auth.dtos.RegisterUserDto;
import com.demo.admin.modules.auth.responses.LoginResponse;
import com.demo.admin.modules.user.models.UserModel;
import com.demo.admin.modules.user.repositories.UserRepository;
import com.demo.admin.services.jwt.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService _jwtService;
    private final UserRepository _userRepository;
    private final PasswordEncoder _passwordEncoder;
    private final AuthenticationManager _authenticationManager;

    public ResponseEntity<?> register(RegisterUserDto input) {
       
        Optional<UserModel> existingUser = _userRepository.findByEmailUser(input.getEmail());
       
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "err", -1,
                    "msg", "Email already exists!"));
        }

        UserModel user = UserModel.builder()
                .id((long) (Math.random() * 100000000) + 1)
                .shopId((long) (Math.random() * 1000000000) + 1)
                .password(_passwordEncoder.encode(input.getPassword()))
                .username(input.getUsername())
                .email(input.getEmail())
                .name(input.getUsername())
                .sex(0)
                .phone(0)
                .role("Shop_admin")
                .build();

        int rowsAffected = _userRepository.createUser(user);

        if (rowsAffected > 0) {
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "err", 0,
                    "msg", "signup is success"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "err", -1,
                    "msg", "signup is failed"));
        }
    };

    public ResponseEntity<?> login(LoginUserDto input) {
        System.out.println(input);
        Optional<UserModel> existingUser = _userRepository.findByEmailUser(input.getEmail());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "err", -1,
                    "msg", "User not found"));
        }

        Authentication authentication = _authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()));

        String jwtToken = _jwtService.generateToken(existingUser.get());

        LoginResponse loginResponse = LoginResponse.builder()
                .token(jwtToken)
                .expiresIn(_jwtService.getExpirationTime())
                .build();

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(loginResponse);
    }
}

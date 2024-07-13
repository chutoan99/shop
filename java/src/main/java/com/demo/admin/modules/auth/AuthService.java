package com.demo.admin.modules.auth;

import com.demo.admin.modules.auth.dtos.LoginUserDto;
import com.demo.admin.modules.auth.dtos.RegisterUserDto;
import com.demo.admin.modules.user.UserModel;
import com.demo.admin.modules.user.UserRepository;
import com.demo.admin.services.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    public ResponseEntity<?> signup(RegisterUserDto input) {
        Optional<UserModel> existingUser = userRepository.findByEmailUser(input.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of(
                    "err", -1,
                    "msg", "Email already exists!"
            ));
        }

        UserModel user = UserModel.builder()
                .id((long)(Math.random() * 100000000) + 1)
                .shopId((long)(Math.random() * 1000000000) + 1)
                .password(passwordEncoder.encode(input.getPassword()))
                .username(input.getUsername())
                .email(input.getEmail())
                .name(input.getUsername())
                .sex(0)
                .phone(0)
                .role("Shop_admin")
                .build();

        int  rowsAffected  = userRepository.createUser(
            user.getId(), user.getShopId(),  user.getName(), user.getUsername(), user.getEmail(),  user.getSex(),  user.getRole(),  user.getPassword()
        );

        if(rowsAffected > 0){
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "err", 0,
                    "msg", "signup is success"
            ));
        }else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "err", -1,
                    "msg", "signup is failed"
            ));
        }
    };

    public ResponseEntity<?> signin(LoginUserDto input) {
        Optional<UserModel> existingUser = userRepository.findByEmailUser(input.getEmail());
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "err", -1,
                    "msg", "User not found"
            ));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        String jwtToken = jwtService.generateToken(existingUser.get());
        LoginResponse loginResponse = LoginResponse.builder()
                .token(jwtToken)
                .expiresIn(jwtService.getExpirationTime())
                .build();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(loginResponse);
    }
}

package com.demo.admin.modules.user;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    public List<UserModel> getAllUsers() {
        return userRepository.getUsers();
    }
}

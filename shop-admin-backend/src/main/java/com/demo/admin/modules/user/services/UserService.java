package com.demo.admin.modules.user.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.demo.admin.modules.user.models.UserModel;
import com.demo.admin.modules.user.repositories.UserRepository;
import java.util.List;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository _userRepository;

    public List<UserModel> getAllUsers() {
        return _userRepository.getUsersUsingCriteria();
    }
}
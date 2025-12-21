package com.demo.admin.modules.user.repositories;
import com.demo.admin.modules.user.models.UserModel;
import java.util.List;

public interface UserRepositoryCustom {
    List<UserModel> getUsersUsingCriteria();
}
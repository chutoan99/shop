package com.demo.admin.modules.user.repositories;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.demo.admin.modules.user.models.UserModel;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long>, UserRepositoryCustom {
    @Query(value = "SELECT id, shop_id, username, email, sex, role, name,  address_obj, birthday, phone, avatar, filename, not_new_user, created_at, updated_at from users", nativeQuery = true)
    List<UserModel> getUsers();


    @Query(value = "SELECT * FROM users WHERE users.email = :email LIMIT 1", nativeQuery = true)
    Optional<UserModel> findByEmailUser(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE INTO  users (id, shop_id, name, username, email, sex, role, password) " +
            "VALUES (:#{#user.id}, :#{#user.shopId}, :#{#user.name}, :#{#user.username}, :#{#user.email}, :#{#user.sex}, :#{#user.role}, :#{#user.password})", nativeQuery = true)
    int createUser(@Param("user") UserModel user);

   

}
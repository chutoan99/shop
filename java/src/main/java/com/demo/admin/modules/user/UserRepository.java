package com.demo.admin.modules.user;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserModel, Long> {
    @Query(value="SELECT id, shopid, username, email, sex, role, name,  address, birthday, phone, avatar, filename, not_new_user, createdAt, updatedAt from Users", nativeQuery=true)
    List<UserModel> getUsers();

    @Query(value = "SELECT * FROM Users WHERE Users.email = :email LIMIT 1", nativeQuery = true)
    Optional<UserModel> findByEmailUser(@Param("email") String email);

    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE INTO Users (id, shopid, name, username, email, sex, role, password) " +
            "VALUES (:id, :shopid, :name, :username, :email, :sex, :role, :password)", nativeQuery = true)
    int createUser(
            @Param("id") long id,
            @Param("shopid") long shopId,
            @Param("name") String name,
            @Param("username") String username,
            @Param("email") String email,
            @Param("sex") Integer sex,
            @Param("role") String role,
            @Param("password") String password);
}
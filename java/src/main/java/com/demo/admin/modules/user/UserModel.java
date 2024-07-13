package com.demo.admin.modules.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Users")
public class UserModel implements Serializable, UserDetails {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "shopid")
    private Long shopId;

    @Column(name = "username", nullable = false, length = 255)
    private String username;

    @Column(name = "email", nullable = false, length = 255)
    private String email;

    @Column(name = "sex")
    private Integer sex;

    @Column(name = "role", length = 255)
    private String role;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "password", length = 255)
    private String password;

    @CreationTimestamp
    @Column(name="birthday", updatable = false, insertable = false)
    private Timestamp  birthday;

    @Column(name = "phone")
    private Integer phone;

    @Column(name = "avatar", length = 255)
    private String avatar;

    @Column(name = "filename", length = 255, nullable = true)
    private String filename;

    @Column(name = "not_new_user")
    private Boolean notNewUser;

    @CreationTimestamp
    @Column(name="createdAt", updatable = false, insertable = false)
    private Timestamp  createdAt;

    @CreationTimestamp
    @Column(name="updatedAt", updatable = false, insertable = false)
    private Timestamp  updatedAt;
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

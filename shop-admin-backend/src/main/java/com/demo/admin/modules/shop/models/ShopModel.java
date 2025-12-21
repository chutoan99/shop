package com.demo.admin.modules.shop.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "shops")
public class ShopModel {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "item_count")
    private Integer itemCount;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "cover", length = 255)
    private String cover;

    @Column(name = "follower_count")
    private Integer followerCount;

    @Column(name = "rating_star")
    private Integer ratingStar;

    @Column(name = "rating_bad")
    private Integer ratingBad;

    @Column(name = "rating_good")
    private Integer ratingGood;

    @Column(name = "rating_normal")
    private Integer ratingNormal;

    @Column(name = "status")
    private Integer status;

    @Column(name = "shop_location", length = 255)
    private String shopLocation;

    @Column(name = "username", length = 255)
    private String username;

    @Column(name = "portrait", length = 255)
    private String portrait;

    @Column(name = "response_rate")
    private Integer responseRate;

    @Column(name = "country", length = 255)
    private String country;

    @Column(name = "response_time")
    private Integer responseTime;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "followed")
    private Boolean followed;

    @CreationTimestamp
    @Column(name = "last_active_time", updatable = false, insertable = false)
    private Timestamp lastActiveTime;

    @Column(name = "is_official_shop")
    private Boolean isOfficialShop;

    @Column(name = "is_active")
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name = "updated_at", updatable = false, insertable = false)
    private Timestamp updatedAt;

}

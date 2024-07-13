package com.demo.admin.modules.shop;

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
@Table(name = "Shops")
public class ShopModel {
    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "userid")
    private Long userid;


    @Column(name = "item_count")
    private Integer item_count;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "cover", length = 255)
    private String cover;

    @Column(name = "follower_count")
    private Integer follower_count;

    @Column(name = "rating_star")
    private Integer rating_star;

    @Column(name = "rating_bad")
    private Integer rating_bad;

    @Column(name = "rating_good")
    private Integer rating_good;

    @Column(name = "rating_normal")
    private Integer rating_normal;

    @Column(name = "status")
    private Integer status;

    @Column(name = "shop_location", length = 255)
    private String shop_location;

    @Column(name = "username", length = 255)
    private String username;

    @Column(name = "portrait", length = 255)
    private String portrait;


    @Column(name = "response_rate")
    private Integer response_rate;

    @Column(name = "country", length = 255)
    private String country;

    @Column(name = "response_time")
    private Integer response_time;

    @Column(name = "description")
    private String description;

    @Column(name = "followed")
    private Boolean followed;

    @CreationTimestamp
    @Column(name="last_active_time", updatable = false, insertable = false)
    private Timestamp last_active_time;

    @Column(name = "is_official_shop")
    private Boolean is_official_shop;

    @Column(name = "is_active")
    private Boolean is_active;

    @CreationTimestamp
    @Column(name="createdAt", updatable = false, insertable = false)
    private Timestamp createdAt;

    @CreationTimestamp
    @Column(name="updatedAt", updatable = false, insertable = false)
    private Timestamp  updatedAt;

}

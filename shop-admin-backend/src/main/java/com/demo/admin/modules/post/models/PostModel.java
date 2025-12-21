package com.demo.admin.modules.post.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class PostModel {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "cat_id")
    private Integer categoryId;

    @Column(name = "name", length = 1000)
    private String name;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "historical_sold")
    private Integer historicalSold;

    @Column(name = "shop_rating")
    private Integer shopRating;

    @Column(name = "shop_name")
    private String shopName;

    @Column(name = "filename")
    private String filename;

    @Column(name = "stock")
    private Integer stock;

    @Column(name = "price")
    private Integer price;

    @Column(name = "price_min")
    private Integer priceMin;

    @Column(name = "price_max")
    private Integer priceMax;

    @Column(name = "price_before_discount")
    private Integer priceBeforeDiscount;

    @Column(name = "price_min_before_discount")
    private Integer priceMinBeforeDiscount;

    @Column(name = "price_max_before_discount")
    private Integer priceMaxBeforeDiscount;

    @Column(name = "liked")
    private Boolean liked;

    @Column(name = "is_official_shop")
    private Boolean isOfficialShop;

    @Column(name = "is_service_by_shop")
    private Boolean isServiceByShop;

    @Column(name = "show_free_shipping")
    private Boolean showFreeShipping;

    @Column(name = "discount_id")
    private Long discountId;

    @Column(name = "promotion_id")
    private Long promotionId;

    @Column(name = "video_id")
    private String videoId;

    @Column(name = "currency")
    private String currency;

    @Column(name = "status")
    private Integer status;

    @Column(name = "sold")
    private Integer sold;

    @Column(name = "liked_count")
    private Integer likedCount;

    @Column(name = "cmt_count")
    private Integer commentCount;

    @Column(name = "discount")
    private String discount;

    @Column(name = "raw_discount")
    private Integer rawDiscount;

    @Column(name = "size_chart")
    private String sizeChart;

    @Column(name = "description")
    private String description;

    @Column(name = "transparent_background_image")
    private String transparentBackgroundImage;

    @Column(name = "images", length = 1000)
    private String images;

    @Column(name = "view_count")
    private Integer viewCount;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "variations", columnDefinition = "json")
    private String variations;

    @Column(name = "metadata", columnDefinition = "json")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "delete_at")
    private Timestamp deletedAt;
}
package com.demo.admin.modules.post.extensions.comment.models;

import java.sql.Timestamp;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "comments")
public class CommentModel {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "parent_cmt_id")
    private Long parentCommentId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "shop_id")
    private Long shopId;

    @Column(name = "order_id")
    private Long orderId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "level")
    private Integer level;

    @Column(name = "is_shop")
    private Boolean isShop;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "rating_star")
    private Integer ratingStar;

    @Column(name = "status")
    private Integer status;

    @Column(name = "author_username", length = 255)
    private String authorUsername;

    @Column(name = "author_portrait", length = 255)
    private String authorPortrait;

    @Column(name = "images", columnDefinition = "TEXT")
    private Long images;

    @Column(name = "cover", length = 255)
    private String cover;

    @Column(name = "videos", length = 255)
    private String videos;

    @Column(name = "tier_variation", length = 255)
    private String tierVariation;

    @Column(name = "list_option", length = 255)
    private String listOption;

    @Column(name = "is_replied")
    private Boolean isReplied;

    @Column(name = "like_count")
    private Integer likeCount;

    @Column(name = "liked")
    private Boolean liked;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "metadata", columnDefinition = "json")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", insertable = false)
    private Timestamp updatedAt;

    @Column(name = "delete_at")
    private Timestamp deleteAt;
}
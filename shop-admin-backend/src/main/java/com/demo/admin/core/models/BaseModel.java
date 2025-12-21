package com.demo.admin.core.models;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = false)
@MappedSuperclass
public class BaseModel {

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "metadata", columnDefinition = "json")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, insertable = false)
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", updatable = false, insertable = false)
    private Timestamp updatedAt;


    @Column(name = "deleted_at")
    private Timestamp deletedAt;
}

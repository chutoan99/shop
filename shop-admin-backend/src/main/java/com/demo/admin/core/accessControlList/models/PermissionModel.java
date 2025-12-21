package com.demo.admin.core.accessControlList.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.demo.admin.core.accessControlList.dtos.CreatePermissionDto;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "acl_permissions",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_acl_permissions_slug",
            columnNames = "slug"
        )
    }
)
public class PermissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name", nullable = false, length = 250)
    private String name;

    @Column(name = "slug", nullable = false, length = 250)
    private String slug;

    @Column(name = "tag", columnDefinition = "TEXT")
    private String tag;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;


    public static PermissionModel fromDto(CreatePermissionDto dto) {
        return PermissionModel.builder()
                .name(dto.getName())
                .slug(dto.getSlug())
                .tag(dto.getTag() != null ? String.join(",", dto.getTag()) : null)
                .description(dto.getDescription())
                .build();
    }
}
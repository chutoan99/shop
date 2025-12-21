package com.demo.admin.core.accessControlList.dtos;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreatePermissionDto {
    private String name;
    private String slug;
    private List<String> tag;
    private String description;
    private String module;
}

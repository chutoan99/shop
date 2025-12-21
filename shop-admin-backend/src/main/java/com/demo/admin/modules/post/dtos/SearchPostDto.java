package com.demo.admin.modules.post.dtos;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchPostDto {
    private int page;
    private int limit;
    private String key;
    private Long shopId;
}

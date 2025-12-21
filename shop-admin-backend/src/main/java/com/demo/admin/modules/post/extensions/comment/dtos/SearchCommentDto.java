package com.demo.admin.modules.post.extensions.comment.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchCommentDto {
    private int page;
    private int limit;
    private String key;
    private Long shopId;
    private Long postId;
}

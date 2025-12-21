package com.demo.admin.modules.post.responses;

import java.util.List;

import com.demo.admin.modules.post.models.PostModel;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostResponse {
    int err;
    String msg;
    int total;
    int totalPage;
    int currentPage;
    int offset;
    int limit;
    List<PostModel> response;
}

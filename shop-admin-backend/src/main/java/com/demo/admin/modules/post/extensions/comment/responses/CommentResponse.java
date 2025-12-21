package com.demo.admin.modules.post.extensions.comment.responses;

import java.util.List;

import com.demo.admin.modules.post.extensions.comment.models.CommentModel;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class CommentResponse {
    int err;
    String msg;
    int total;
    int totalPage;
    int currentPage;
    int offset;
    int limit;
    List<CommentModel> response;
}

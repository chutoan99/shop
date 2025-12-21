package com.demo.admin.modules.post.extensions.comment.services;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.admin.modules.post.extensions.comment.dtos.SearchCommentDto;
import com.demo.admin.modules.post.extensions.comment.models.CommentModel;
import com.demo.admin.modules.post.extensions.comment.repositories.CommentRepository;
import com.demo.admin.modules.post.extensions.comment.responses.CommentResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CommentService {
    private final CommentRepository _commentRepository;

    public ResponseEntity<CommentResponse> getAll(SearchCommentDto searchDto, long postId) {
        Page<CommentModel> response = _commentRepository.search(searchDto);

        CommentResponse commentResponse = CommentResponse.builder()
                .err(1)
                .msg("get success")
                .offset((int) response.getPageable().getOffset())
                .total((int) response.getTotalElements())
                .limit(searchDto.getLimit())
                .currentPage(searchDto.getPage())
                .totalPage(response.getTotalPages())
                .response(response.toList())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(commentResponse);
    }
}

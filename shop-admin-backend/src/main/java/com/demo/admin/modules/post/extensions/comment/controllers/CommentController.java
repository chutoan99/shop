package com.demo.admin.modules.post.extensions.comment.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.admin.modules.post.extensions.comment.dtos.SearchCommentDto;
import com.demo.admin.modules.post.extensions.comment.services.CommentService;

import lombok.AllArgsConstructor;


@AllArgsConstructor
@RestController
@RequestMapping("/posts/{postId}/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping(value = "/comments")
    public ResponseEntity<?> getAll(
            @PathVariable Long postId,
            @ModelAttribute SearchCommentDto searchDto,
            @RequestAttribute("shopId") Long shopId) {

        searchDto.setPostId(postId);
        searchDto.setShopId(shopId);

        return commentService.getAll(searchDto, postId);
    }
}

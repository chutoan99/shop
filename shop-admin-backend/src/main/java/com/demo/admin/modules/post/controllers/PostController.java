package com.demo.admin.modules.post.controllers;

import com.demo.admin.modules.post.dtos.SearchPostDto;
import com.demo.admin.modules.post.services.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/posts")
public class PostController {
    private final PostService _postService;

    @GetMapping
    public ResponseEntity<?> getAll(
            @ModelAttribute SearchPostDto searchDto,
            @RequestAttribute("shopId") Long shopId) {

        searchDto.setShopId(shopId);

        return _postService.getAll(searchDto);
    }
}
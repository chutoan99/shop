package com.demo.admin.modules.post.services;
import com.demo.admin.modules.post.dtos.SearchPostDto;
import com.demo.admin.modules.post.models.PostModel;
import com.demo.admin.modules.post.repositories.PostRepository;
import com.demo.admin.modules.post.responses.PostResponse;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Service
public class PostService {
    private final PostRepository _postRepository;

    public ResponseEntity<PostResponse> getAll(SearchPostDto searchDto) {
        Page<PostModel> response = _postRepository.search(searchDto);

        PostResponse postResponse = PostResponse.builder()
                .err(1)
                .msg("get success")
                .offset((int) response.getPageable().getOffset())
                .total((int) response.getTotalElements())
                .limit(searchDto.getLimit())
                .currentPage(searchDto.getPage())
                .totalPage(response.getTotalPages())
                .response(response.toList())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(postResponse);
    }
}


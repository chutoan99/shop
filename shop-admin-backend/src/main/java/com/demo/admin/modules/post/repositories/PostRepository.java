package com.demo.admin.modules.post.repositories;

import com.demo.admin.modules.post.models.PostModel;
import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.admin.core.interfaces.BaseSearchRepository;

public interface PostRepository extends JpaRepository<PostModel, Long>, BaseSearchRepository<PostModel> {
}

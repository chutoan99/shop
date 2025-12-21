package com.demo.admin.modules.post.extensions.comment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.admin.core.interfaces.BaseSearchRepository;
import com.demo.admin.modules.post.extensions.comment.models.CommentModel;

public interface CommentRepository extends JpaRepository<CommentModel, Long>, BaseSearchRepository<CommentModel> {
}

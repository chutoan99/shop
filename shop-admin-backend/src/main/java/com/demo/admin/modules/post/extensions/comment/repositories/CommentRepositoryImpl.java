package com.demo.admin.modules.post.extensions.comment.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.demo.admin.core.interfaces.BaseSearchRepository;
import com.demo.admin.modules.post.extensions.comment.dtos.SearchCommentDto;
import com.demo.admin.modules.post.extensions.comment.models.CommentModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class CommentRepositoryImpl implements BaseSearchRepository<CommentModel> {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<CommentModel> search(Object searchDto) {
        SearchCommentDto queryDto = (SearchCommentDto) searchDto;

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<CommentModel> cq = cb.createQuery(CommentModel.class);
        Root<CommentModel> root = cq.from(CommentModel.class);

        cq.select(root);

        // Where conditions
        List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();
        if (queryDto.getShopId() != null) {
            predicates.add(cb.equal(root.get("shopId"), queryDto.getShopId()));
        }
        if (predicates.size() > 0) {
            cq.where(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }

        // Paging
        int page = queryDto.getPage();
        int limit = queryDto.getLimit();

        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<CommentModel> countRoot = countQuery.from(CommentModel.class);

        countQuery.select(cb.count(countRoot));

        List<jakarta.persistence.criteria.Predicate> countPredicates = new ArrayList<>();
        if (queryDto.getShopId() != null) {
            countPredicates.add(cb.equal(countRoot.get("shopId"), queryDto.getShopId()));
        }
        if (countPredicates.size() > 0) {
            countQuery.where(countPredicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }

        Long total = entityManager.createQuery(countQuery).getSingleResult();

        // Fetch results
        TypedQuery<CommentModel> typedQuery = entityManager.createQuery(cq);
        typedQuery.setFirstResult(page * limit);
        typedQuery.setMaxResults(limit);

        List<CommentModel> records = typedQuery.getResultList();

        return new PageImpl<CommentModel>(records, PageRequest.of(page, limit), total);
    }
}

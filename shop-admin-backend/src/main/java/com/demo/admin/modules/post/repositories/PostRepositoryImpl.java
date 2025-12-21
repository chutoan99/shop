package com.demo.admin.modules.post.repositories;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.demo.admin.core.interfaces.BaseSearchRepository;
import com.demo.admin.modules.post.dtos.SearchPostDto;
import com.demo.admin.modules.post.models.PostModel;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public class PostRepositoryImpl implements BaseSearchRepository<PostModel> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<PostModel> search(Object searchDto) {
        SearchPostDto queryDto = (SearchPostDto) searchDto;

        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<PostModel> cq = cb.createQuery(PostModel.class);
        Root<PostModel> root = cq.from(PostModel.class);

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
        Root<PostModel> countRoot = countQuery.from(PostModel.class);

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
        TypedQuery<PostModel> typedQuery = entityManager.createQuery(cq);
        typedQuery.setFirstResult(page * limit);
        typedQuery.setMaxResults(limit);

        List<PostModel> postList = typedQuery.getResultList();

        return new PageImpl<PostModel>(postList, PageRequest.of(page, limit), total);
    }
}
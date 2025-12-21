package com.demo.admin.modules.account.repositories;

import com.demo.admin.core.interfaces.BaseSearchRepository;
import com.demo.admin.modules.account.dtos.SearchAccountTrialDto;
import com.demo.admin.modules.shop.models.*;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

public class AccountTrialRepositoryImpl implements BaseSearchRepository<ShopModel> {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ShopModel> search(Object searchDto) {
        SearchAccountTrialDto queryDto = (SearchAccountTrialDto) searchDto;
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<ShopModel> cq = cb.createQuery(ShopModel.class);
        Root<ShopModel> root = cq.from(ShopModel.class);

        // Where conditions
        List<jakarta.persistence.criteria.Predicate> predicates = new ArrayList<>();

        if (predicates.size() > 0) {
            cq.select(root).where(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        }
        // Select fields (select full entity or use cb.construct for specific columns)
        cq.select(root);

        // You can build dynamic where conditions here if needed
        // Example: if (searchDto.getKeyword() != null) {...}

        // Paging
        int page = queryDto.getPage();
        int limit = queryDto.getLimit();

        // Count query
        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        countQuery.select(cb.count(countQuery.from(ShopModel.class)));

        Long total = entityManager.createQuery(countQuery).getSingleResult();

        TypedQuery<ShopModel> typedQuery = entityManager.createQuery(cq);
        typedQuery.setFirstResult(page * limit);
        typedQuery.setMaxResults(limit);

        List<ShopModel> accountList = typedQuery.getResultList();

        return new PageImpl<>(accountList, PageRequest.of(page, limit), total);
    }
}

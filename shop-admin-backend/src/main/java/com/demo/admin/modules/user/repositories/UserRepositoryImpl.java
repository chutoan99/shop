package com.demo.admin.modules.user.repositories;

import com.demo.admin.modules.user.models.UserModel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

import java.util.List;


public class UserRepositoryImpl implements UserRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<UserModel> getUsersUsingCriteria() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<UserModel> query = cb.createQuery(UserModel.class);
        Root<UserModel> root = query.from(UserModel.class);

        query.select(cb.construct(UserModel.class,
                root.get("id"),
                root.get("shopId"),
                root.get("username"),
                root.get("email"),
                root.get("sex"),
                root.get("role"),
                root.get("name"),
                root.get("addressObj"),
                root.get("birthday"),
                root.get("phone"),
                root.get("avatar"),
                root.get("filename"),
                root.get("notNewUser"),
                root.get("createdAt"),
                root.get("updatedAt")
        ));

        return entityManager.createQuery(query).getResultList();
    }
}

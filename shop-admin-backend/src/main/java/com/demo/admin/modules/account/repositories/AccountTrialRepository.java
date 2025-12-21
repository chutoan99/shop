package com.demo.admin.modules.account.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.admin.core.interfaces.BaseSearchRepository;
import com.demo.admin.modules.shop.models.*;

@Repository
public interface AccountTrialRepository extends JpaRepository<ShopModel, Long>, BaseSearchRepository<ShopModel> {
}
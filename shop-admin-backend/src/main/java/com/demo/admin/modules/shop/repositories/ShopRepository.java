package com.demo.admin.modules.shop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.admin.modules.shop.models.*;

@Repository
public interface ShopRepository extends JpaRepository<ShopModel, Long> {
    public ShopModel findShopById(Long shopId);
}
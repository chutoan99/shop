package com.demo.admin.modules.shop;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends CrudRepository<ShopModel, Long> {
    @Query(value="SELECT * from Shops", nativeQuery=true)
    List<ShopModel> getAll();
}
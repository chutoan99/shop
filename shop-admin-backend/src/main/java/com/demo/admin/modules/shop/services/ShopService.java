package com.demo.admin.modules.shop.services;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.admin.modules.shop.models.ShopModel;
import com.demo.admin.modules.shop.repositories.ShopRepository;
import com.demo.admin.modules.shop.responses.ShopResponse;

@AllArgsConstructor
@Service
public class ShopService {
    private final ShopRepository _shopRepository;

    public ResponseEntity<ShopResponse> getShopAccount(Long shopId) {
        ShopModel response = _shopRepository.findShopById(shopId);

        ShopResponse shopAccountResponse = ShopResponse.builder()
                .err(1)
                .msg("get success")
                .response(response)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(shopAccountResponse);
    }
}

package com.demo.admin.modules.shop;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
@AllArgsConstructor
@Service
public class ShopService {
    private final ShopRepository shopRepository;

    public ResponseEntity<ShopResponse> getAllShops() {

        List<ShopModel> response = shopRepository.getAll();

        ShopResponse shopResponse = ShopResponse.builder()
                .err(1)
                .msg("get success")
                .total(response.size())
                .response(response)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(shopResponse);
    }
}

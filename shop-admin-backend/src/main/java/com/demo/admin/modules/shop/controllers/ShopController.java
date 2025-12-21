package com.demo.admin.modules.shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.admin.modules.shop.services.ShopService;

@AllArgsConstructor
@RestController
@RequestMapping("/shops")
public class ShopController {
    private final ShopService _shopService;

    @GetMapping("/setting")
    public ResponseEntity<?> getShopAccount(
            @RequestAttribute("shopId") Long shopId) {
        return _shopService.getShopAccount(shopId);
    }
}

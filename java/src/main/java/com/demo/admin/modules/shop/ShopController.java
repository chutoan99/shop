package com.demo.admin.modules.shop;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/shops")
public class ShopController {
    private final ShopService shopService;
    @GetMapping("/")
    public ResponseEntity<?> getAllShops() {

        return shopService.getAllShops();
    }
}

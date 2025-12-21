package com.demo.admin.modules.shop.responses;

import com.demo.admin.modules.shop.models.ShopModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;


@Builder
@Data
@AllArgsConstructor
public class ShopResponse {
    int err;
    String msg;
    ShopModel response;
}

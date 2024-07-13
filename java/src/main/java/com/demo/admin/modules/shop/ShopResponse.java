package com.demo.admin.modules.shop;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ShopResponse {
    int err;
    String msg;
    int total;
    List<ShopModel> response;
}

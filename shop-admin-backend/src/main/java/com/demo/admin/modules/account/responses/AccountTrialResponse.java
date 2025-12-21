package com.demo.admin.modules.account.responses;

import lombok.Builder;
import lombok.Data;

import java.util.List;

import com.demo.admin.modules.shop.models.ShopModel;

@Data
@Builder
public class AccountTrialResponse {
    int err;
    String msg;
    int total;
    int totalPage;
    int currentPage;
    int offset;
    int limit;
    List<ShopModel> response;
}


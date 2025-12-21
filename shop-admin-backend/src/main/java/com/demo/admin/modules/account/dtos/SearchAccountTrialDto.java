package com.demo.admin.modules.account.dtos;

import lombok.Data;

@Data
public class SearchAccountTrialDto {
    private int page;
    private int limit;
    private String key;
}

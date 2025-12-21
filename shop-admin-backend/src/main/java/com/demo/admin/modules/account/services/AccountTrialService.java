package com.demo.admin.modules.account.services;

import com.demo.admin.modules.account.dtos.SearchAccountTrialDto;
import com.demo.admin.modules.account.repositories.AccountTrialRepository;
import com.demo.admin.modules.account.responses.AccountTrialResponse;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.demo.admin.modules.shop.models.ShopModel;

@AllArgsConstructor
@Service
public class AccountTrialService {
    private final AccountTrialRepository _accountTrialRepository;

    public ResponseEntity<AccountTrialResponse> getAll(SearchAccountTrialDto searchDto) {
        Page<ShopModel> response = _accountTrialRepository.search(searchDto);

        AccountTrialResponse accountTrialResponse = AccountTrialResponse.builder()
                .err(1)
                .msg("get success")
                .offset((int) response.getPageable().getOffset())
                .total((int) response.getTotalElements())
                .limit(searchDto.getLimit())
                .currentPage(searchDto.getPage())
                .totalPage(response.getTotalPages())
                .response(response.toList())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(accountTrialResponse);
    }
}

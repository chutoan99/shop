package com.demo.admin.modules.account.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.demo.admin.modules.account.dtos.SearchAccountTrialDto;
import com.demo.admin.modules.account.services.AccountTrialService;

@AllArgsConstructor
@RestController
@RequestMapping("/accounts-trial")
public class AccountTrialController {
    private final AccountTrialService _accountTrialService;

    @GetMapping()
    public ResponseEntity<?> getAllAccountTrials(
            @ModelAttribute SearchAccountTrialDto searchDto) {
        return _accountTrialService.getAll(searchDto);
    }
}

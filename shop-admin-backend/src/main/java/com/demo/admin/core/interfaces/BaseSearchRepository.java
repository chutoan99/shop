package com.demo.admin.core.interfaces;

import org.springframework.data.domain.Page;

public interface BaseSearchRepository<T> {
    Page<T> search(Object searchDto);
}

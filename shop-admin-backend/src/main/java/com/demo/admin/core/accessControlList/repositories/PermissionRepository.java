package com.demo.admin.core.accessControlList.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.admin.core.accessControlList.models.PermissionModel;
import org.springframework.stereotype.Repository;
import com.demo.admin.core.interfaces.BaseSearchRepository;

@Repository
public interface PermissionRepository
        extends JpaRepository<PermissionModel, Long> {
}
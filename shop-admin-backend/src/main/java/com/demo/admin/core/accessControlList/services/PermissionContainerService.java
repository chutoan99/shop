package com.demo.admin.core.accessControlList.services;
import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;

import com.demo.admin.core.accessControlList.dtos.CreatePermissionDto;
import com.demo.admin.core.accessControlList.models.PermissionModel;
import com.demo.admin.core.accessControlList.repositories.PermissionRepository;
import com.demo.admin.core.accessControlList.constants.PermissionCoreConstants;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;


@AllArgsConstructor
@Service
public class PermissionContainerService {

    private final PermissionRepository _permissionRepository;

    /* ================= STATIC CONTAINER ================= */

    private static final List<CreatePermissionDto> container = new CopyOnWriteArrayList<>();
    private static final Set<String> containerSlug = new HashSet<>();

    public static List<CreatePermissionDto> getPermissions(String module) {
        return container.stream()
                .filter(p -> Objects.equals(p.getModule(), module))
                .toList();
    }

    public static synchronized void register(
            List<CreatePermissionDto> permissions,
            String module
    ) {
        for (CreatePermissionDto permission : permissions) {
            if (!containerSlug.contains(permission.getSlug())) {
                permission.setModule(module);
                container.add(permission);
                containerSlug.add(permission.getSlug());
            }
        }
    }

    @PostConstruct
    public void onModuleInit() {
        register(PermissionCoreConstants.PERMISSIONS, "core");
    }


    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationBootstrap() {
        new Timer().schedule(
            new TimerTask() {
                @Override
                public void run() {
                    seedNewPermissions();
                }
            },
            4000
        );
    }

    private void seedNewPermissions() {
        try {
            List<PermissionModel> dbPermissions = _permissionRepository.findAll();

            Set<String> dbPermissionSlugs = dbPermissions.stream()
                    .map(PermissionModel::getSlug)
                    .collect(Collectors.toSet());

            List<CreatePermissionDto> newPermissions = container.stream()
                    .filter(p -> !dbPermissionSlugs.contains(p.getSlug()))
                    .toList();

            if (!newPermissions.isEmpty()) {
                _permissionRepository.saveAll(
                        newPermissions.stream()
                                .map(PermissionModel::fromDto)
                                .toList()
                );
            }

        } catch (Exception e) {
//            log.error("Save new Permissions error", e);
        }
    }

}

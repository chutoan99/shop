package com.demo.admin.core.accessControlList.constants;

import com.demo.admin.core.accessControlList.dtos.CreatePermissionDto;

import java.util.List;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class PermissionCoreConstants {
    public static final List<CreatePermissionDto> PERMISSIONS = List.of(
        CreatePermissionDto.builder()
            .name("This is system admin permission")
            .slug("system::read")
            .tag(List.of("system"))
            .description(
                "With this permission, user can read system status information"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("This is system admin permission")
            .slug("system::update")
            .tag(List.of("system"))
            .description(
                "With this permission, user can make change of system features"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Assign Permissions to Group")
            .slug("group::assign:permission")
            .tag(List.of("bu-owner"))
            .description(
                "With this permission, user can able to assign permissions to a groups"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Revoke Permissions")
            .slug("group::revoke:permission")
            .tag(List.of("bu-owner"))
            .description(
                "User with this permission can able to revoke permissions from group"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Create new Group")
            .slug("group::create")
            .tag(List.of("bu-owner"))
            .description(
                "User with this permissions can able to create new group"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Read Group information")
            .slug("group::read")
            .tag(List.of("bu-owner"))
            .description(
                "User with this permissions user can read group information include permissions and user in its group"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Delete Group")
            .slug("group::delete")
            .tag(List.of("bu-owner"))
            .description(
                "User with this permissions can able to delete group"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Update Group information")
            .slug("group::update")
            .tag(List.of("bu-owner"))
            .description(
                "To able to update group information, user must need this information"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Assign User to Group")
            .slug("group::assign:user")
            .tag(List.of("bu-owner"))
            .description(
                "With this permission, user can able to assign users to a groups"
            )
            .build(),

        CreatePermissionDto.builder()
            .name("Revoke User from Group")
            .slug("group::revoke:user")
            .tag(List.of("bu-owner"))
            .description(
                "With this permission, user can able to assign users to a groups"
            )
            .build()
    );
}

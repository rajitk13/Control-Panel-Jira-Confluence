export const getJiraGroups = async (url, value, isCopy, setUserGroups, setUserCopyGroups, token) => {
    await fetch(`${url}/rest/api/2/user?username=${isCopy ? value.copyusername : value.username}&expand=groups`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data?.groups?.size > 0) {
                !isCopy ? setUserGroups(data?.groups?.items) : setUserCopyGroups(data?.groups?.items);
            } else {
                setUserGroups([]);
                setUserCopyGroups([]);
            }
        })
        .catch((err) => {
            console.error("Error fetching jira groups: ", err);
        });
};

export const getConfluenceGroups = async (url, value, isCopy, setUserConfGroups, setUserCopyConfGroups, token) => {
    await fetch(`${url}/rest/api/user/memberof?username=${isCopy ? value.copyusername : value.username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace <pat> with your actual Personal Access Token
        },
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data?.results?.length > 0) {
                !isCopy ? setUserConfGroups(data.results) : setUserCopyConfGroups(data.results);
            } else {
                setUserConfGroups([]);
                setUserCopyConfGroups([]);
            }
        })
        .catch((err) => {
            console.error("Error fetching confluence groups: ", err);
        });
};

export const getProjects = async (url, token) => {
    return await fetch(`${url}/rest/api/2/project`, {
        method: "GET",
        cache: "force-cache",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace <pat> with your actual Personal Access Token
        },
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.map((element) => ({
                label: element["name"],
                value: element["id"],
            }));
        })
        .catch((err) => {
            console.error("Error fetching projects: ", err);
        });
};

export const getProjectPermissions = async (url, token, projId) => {
    return await fetch(`${url}/rest/api/2/project/${projId}/permissionscheme`, {
        method: "GET",
        cache: "force-cache",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        redirect: "follow",
    })
        .then((res) => {
            return res.json();
        })
        .then(async (data) => {
            return await fetch(`${data?.self}?expand=all`, {
                method: "GET",
                cache: "force-cache",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                redirect: "follow",
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const groupPermissions = {};
                    const projectRolePermissions = {};

                    data.permissions.forEach((permission) => {
                        if (permission.holder.type === "group") {
                            const groupName = permission.holder.group.name;
                            if (!groupPermissions[groupName]) {
                                groupPermissions[groupName] = [];
                            }
                            groupPermissions[groupName].push(permission.permission);
                        } else if (permission.holder.type === "projectRole") {
                            const projectRoleName = permission.holder.projectRole.name;
                            if (!projectRolePermissions[projectRoleName]) {
                                projectRolePermissions[projectRoleName] = [];
                            }
                            projectRolePermissions[projectRoleName].push(permission.permission);
                        }
                    });

                    return { group: groupPermissions, projectRole: projectRolePermissions };
                });
        })
        .catch((err) => {
            console.error("Error fetching permissions", err);
        });
};

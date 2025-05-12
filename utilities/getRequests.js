export const getJiraGroups = async (url, value, isCopy, setUserGroups, setUserCopyGroups, token) => {
    console.log(value);

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
            console.log(data);
            if (data?.groups?.size > 0) {
                console.log("test here ");
                !isCopy ? setUserGroups(data?.groups?.items) : setUserCopyGroups(data?.groups?.items);
            } else {
                setUserGroups([]);
                setUserCopyGroups([]);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getConfluenceGroups = async (url, value, isCopy, setUserConfGroups, setUserCopyConfGroups, token) => {
    console.log(value);

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
            console.log(err);
        });
};

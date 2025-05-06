import { useContext, useEffect, useState } from "react";
import { Button, TextInput, Grid, Paper, Text, Title, Group, List, Transition, Switch } from "@mantine/core";
import { useForm } from "@mantine/form";
import { GlobalContext } from "../context/GlobalContext";

function GroupManager() {
    const { setActiveTab, formValues } = useContext(GlobalContext);
    useEffect(() => {
        setActiveTab({ value: "Group Manager" });
        console.log(formValues);
    }, []);
    const [checked, setChecked] = useState(false);
    const [userGroups, setUserGroups] = useState<any[]>([]);
    const [userConfGroups, setUserConfGroups] = useState<any[]>([]);

    const [userCopyGroups, setUserCopyGroups] = useState<any[]>([]);
    const [userCopyConfGroups, setUserCopyConfGroups] = useState<any[]>([]);
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            username: "",
            copyusername: "",
            // termsOfService: false,
        },

        validate: {
            username: (value) => (value.trim().length == 0 ? "Value is empty" : null),
        },
    });

    const getJiraGroups = async (value: any, isCopy: boolean) => {
        console.log(value);

        await fetch(
            `<jira-link>=${
                isCopy ? value.copyusername : value.username
            }&expand=groups`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer <token>",
                },
                redirect: "follow",
            }
        )
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data?.groups?.size > 0) {
                    !isCopy ? setUserGroups(data.groups.items) : setUserCopyGroups(data.groups.items);
                } else {
                    setUserGroups([]);
                    setUserCopyGroups([]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getConfluenceGroups = async (value: any, isCopy: boolean) => {
        console.log(value);

        try {
            const response = await fetch(
                `<confluence-link>=${
                    isCopy ? value.copyusername : value.username
                }`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer <token>", // Replace <pat> with your actual Personal Access Token
                    },
                    redirect: "follow",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            if (data?.results?.length > 0) {
                !isCopy ? setUserConfGroups(data.results) : setUserCopyConfGroups(data.results);
            } else {
                setUserConfGroups([]);
                setUserCopyConfGroups([]);
            }
        } catch (error) {
            console.error("Error fetching Confluence groups:", error);
        }
    };

    return (
        <>
            <Title order={2} mb={10}>
                Group Manager
            </Title>

            <form
                onSubmit={form.onSubmit((values) => {
                    getJiraGroups(values, false);
                    getConfluenceGroups(values, false);
                })}
            >
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="Enter username"
                    key={form.key("username")}
                    {...form.getInputProps("username")}
                />

                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>

            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} mt={50}>
                <Grid.Col span={6}>
                    <Paper shadow="xs" p="xl">
                        <Title order={5}>Jira Groups</Title>

                        {userGroups.length > 0 ? (
                            <List>
                                {userGroups.map((item, index) => (
                                    <List.Item key={item?.name}> {item?.name}</List.Item>
                                ))}
                            </List>
                        ) : (
                            <Text>No Groups found</Text>
                        )}
                    </Paper>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Paper shadow="xs" p="xl">
                        <Title order={5}>Confluence Groups</Title>

                        {userConfGroups.length > 0 ? (
                            <List>
                                {userConfGroups.map((item, index) => (
                                    <List.Item key={item?.name}> {item?.name}</List.Item>
                                ))}
                            </List>
                        ) : (
                            <Text>No Groups found</Text>
                        )}
                    </Paper>
                </Grid.Col>
            </Grid>
            <Switch
                mt={20}
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label="Copy groups from another user?"
            />

            <Transition mounted={checked} transition="fade" duration={400} timingFunction="ease">
                {(styles) => (
                    <div style={styles}>
                        <form
                            onSubmit={form.onSubmit((values) => {
                                getJiraGroups(values, true);
                                getConfluenceGroups(values, true);
                            })}
                        >
                            <TextInput
                                mt={20}
                                withAsterisk
                                label="Reference User Username"
                                placeholder="Enter username"
                                key={form.key("copyusername")}
                                {...form.getInputProps("copyusername")}
                            />

                            <Group justify="flex-end" mt="md">
                                <Button type="submit">Submit</Button>
                            </Group>
                        </form>

                        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} mt={50}>
                            <Grid.Col span={6}>
                                <Paper shadow="xs" p="xl">
                                    <Title order={5}>Jira Groups</Title>

                                    {userCopyGroups.length > 0 ? (
                                        <List>
                                            {userCopyGroups.map((item, index) => (
                                                <List.Item key={item?.name}> {item?.name}</List.Item>
                                            ))}
                                        </List>
                                    ) : (
                                        <Text>No Groups found</Text>
                                    )}
                                </Paper>
                                <Button fullWidth mt={25}>
                                    Copy Internal Groups JIRA
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <Paper shadow="xs" p="xl">
                                    <Title order={5}>Confluence Groups</Title>

                                    {userCopyConfGroups.length > 0 ? (
                                        <List>
                                            {userCopyConfGroups.map((item, index) => (
                                                <List.Item key={item?.name}> {item?.name}</List.Item>
                                            ))}
                                        </List>
                                    ) : (
                                        <Text>No Groups found</Text>
                                    )}
                                </Paper>
                                <Button fullWidth mt={25}>
                                    Copy Internal Groups CONF
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </div>
                )}
            </Transition>
        </>
    );
}

export default GroupManager;

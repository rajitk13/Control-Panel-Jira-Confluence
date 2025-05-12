import { useContext, useEffect, useState } from "react";
import { Button, TextInput, Grid, Paper, Text, Title, Group, List, Transition, Switch, Drawer } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { GlobalContext } from "../context/GlobalContext";
import { getJiraGroups, getConfluenceGroups } from "../utilities/getRequests";

function GroupManager() {
    const { setActiveTab, formValues } = useContext(GlobalContext);
    useEffect(() => {
        setActiveTab({ value: "Group Manager" });
        console.log(formValues);
        console.log(formValues.conf_token);
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

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer opened={opened} onClose={close} title="Project - Users and Roles" position="right">
                {/* Drawer content */}
            </Drawer>

            <Title order={2} mb={10}>
                Group Manager
            </Title>

            <form
                onSubmit={form.onSubmit((values) => {
                    getJiraGroups(
                        formValues.jira_url,
                        values,
                        false,
                        setUserGroups,
                        setUserCopyGroups,
                        formValues.jira_token
                    );
                    getConfluenceGroups(
                        formValues.conf_url,
                        values,
                        false,
                        setUserConfGroups,
                        setUserCopyConfGroups,
                        formValues.conf_token
                    );
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
                                getJiraGroups(
                                    formValues.jira_url,
                                    values,
                                    true,
                                    setUserGroups,
                                    setUserCopyGroups,
                                    formValues.jira_token
                                );
                                getConfluenceGroups(
                                    formValues.conf_url,
                                    values,
                                    true,
                                    setUserConfGroups,
                                    setUserCopyConfGroups,
                                    formValues.conf_token
                                );
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
            <Button variant="default" onClick={open} mt={20}>
                Check Project - Users and Roles
            </Button>
        </>
    );
}

export default GroupManager;

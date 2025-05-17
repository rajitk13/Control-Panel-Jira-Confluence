

import { useContext, useEffect, useState } from "react";
import { Button, TextInput, Grid, Title, Group, Transition, Switch, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { GlobalContext } from "../../context/GlobalContext";
import { getJiraGroups, getConfluenceGroups } from "../../utilities/getRequests";
import ProjectRoles from "./projectRoles";

import PaperCard from "./paperCard";


function GroupManager() {
    const { setActiveTab, formValues } = useContext(GlobalContext);
    useEffect(() => {
        setActiveTab({ value: "Group Manager" });
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
            <ProjectRoles opened={opened} close={close} />
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
                    <PaperCard data={userGroups} />
                    <MultiSelect
                        label="Your favorite libraries"
                        placeholder="Pick value"
                        data={["React", "Angular", "Vue", "Svelte"]}
                        searchable
                        nothingFoundMessage="Nothing found..."
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <PaperCard data={userConfGroups} />
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
                                <PaperCard data={userCopyGroups} />
                                <Button fullWidth mt={25}>
                                    Copy Internal Groups JIRA
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PaperCard data={userCopyConfGroups} />
                                <Button fullWidth mt={25}>
                                    Copy Internal Groups CONF
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </div>
                )}
            </Transition>
            <Button variant="default" onClick={open} mt={20}>
                Permission Helper
            </Button>
        </>
    );
}

export default GroupManager;

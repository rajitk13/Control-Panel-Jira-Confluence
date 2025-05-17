import { useState, useContext, useEffect } from "react";
import { Drawer, Select, ComboboxItem, Accordion, Box, LoadingOverlay, Text, Tabs } from "@mantine/core";
import { GlobalContext } from "../../context/GlobalContext";
import { getProjects, getProjectPermissions } from "../../utilities/getRequests";

function ProjectRoles(props: any) {
    const { formValues } = useContext(GlobalContext);
    const [projId, setProjId] = useState<ComboboxItem | null>(null);
    const [selectValues, setSelectValues] = useState([]);
    const [perms, setPerms] = useState<{ group: {}; projectRole: {} } | null>(null);
    const [permsLoader, setPermsLoader] = useState(false);

    useEffect(() => {
        getProjects(formValues.jira_url, formValues.jira_token).then((data) => {
            setSelectValues(data);
        });
    }, []);

    useEffect(() => {
        if (projId) {
            setPermsLoader(true);
            getProjectPermissions(formValues.jira_url, formValues.jira_token, projId?.value).then((data) => {
                setPerms({ group: data?.group || {}, projectRole: data?.projectRole || {} });
                setPermsLoader(false);
            });
        } else setPerms(null);
    }, [projId]);

    return (
        <Drawer opened={props.opened} onClose={props.close} title="Permission Helper" position="right">
            <Tabs defaultValue="JIRA">
                <Tabs.List>
                    <Tabs.Tab value="JIRA">JIRA</Tabs.Tab>
                    <Tabs.Tab value="CONF">Confluence</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="JIRA">
                    <Box pos="relative" mt={15}>
                        <LoadingOverlay
                            visible={!selectValues || permsLoader}
                            loaderProps={{ children: "Loading..." }}
                        />
                        <Select
                            data={selectValues}
                            value={projId ? projId.value : null}
                            onChange={(_value, option) => setProjId(option)}
                            placeholder="Select Project"
                            searchable
                            allowDeselect
                            nothingFoundMessage="Nothing found..."
                        />

                        {perms ? (
                            <>
                                <Text ta="center" pt={10} fw={500}>
                                    Groups
                                </Text>
                                <Accordion>
                                    {Object.entries(perms.group).map(([groupName, permissions]: any) => (
                                        <Accordion.Item key={groupName} value={groupName}>
                                            <Accordion.Control>{groupName}</Accordion.Control>
                                            <Accordion.Panel>
                                                <ul>
                                                    {permissions.map((permission: any, index: number) => (
                                                        <li key={index}>{permission}</li>
                                                    ))}
                                                </ul>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                                <Text ta="center" pt={10} fw={500}>
                                    Project Roles
                                </Text>
                                <Accordion>
                                    {Object.entries(perms.projectRole).map(([roleName, permissions]: any) => (
                                        <Accordion.Item key={roleName} value={roleName}>
                                            <Accordion.Control>{roleName}</Accordion.Control>
                                            <Accordion.Panel>
                                                <ul>
                                                    {permissions.map((permission: any, index: number) => (
                                                        <li key={index}>{permission}</li>
                                                    ))}
                                                </ul>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </>
                        ) : (
                            <Text c="dimmed" ta="center" pt={10}>
                                No Project Selected
                            </Text>
                        )}
                    </Box>
                </Tabs.Panel>

                <Tabs.Panel value="CONF">Messages tab content</Tabs.Panel>

                <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
            </Tabs>
        </Drawer>
    );
}

export default ProjectRoles;

import { useState } from "react";
import { Button, TextInput, Grid, Paper, Text, Title } from "@mantine/core";
import { useField } from "@mantine/form";
import { Switch } from "@mantine/core";

function GroupManager() {
    const [checked, setChecked] = useState(false);
    const field = useField({
        initialValue: "",
        validate: (value) => (value.trim().length < 2 ? "Value is too short" : null),
    });

    return (
        <>
            <Title order={2} mb={10}>
                Group Manager
            </Title>
            <TextInput {...field.getInputProps()} label="Username" placeholder="Enter username" mb="md" />
            <Button onClick={field.validate}>Fetch</Button>
            <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }} mt={50}>
                <Grid.Col span={6}>
                    <Paper shadow="xs" p="xl">
                        <Title order={5}>Confluence Groups</Title>
                        {/* <Text>Confluence Groups</Text> */}
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background with
                            shadow
                        </Text>
                    </Paper>
                    <p>add input field to add groups</p>
                </Grid.Col>
                <Grid.Col span={6}>
                    {" "}
                    <Paper shadow="xs" p="xl">
                        <Title order={5}>Jira Groups</Title>
                        <Text>
                            Use it to create cards, dropdowns, modals and other components that require background with
                            shadow
                        </Text>
                    </Paper>
                    <p>add input field to add groups</p>
                </Grid.Col>
            </Grid>
            <Switch
                mt={20}
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
                label="Copy groups from another user?"
            />

            {checked && (
                <>
                    <TextInput
                        {...field.getInputProps()}
                        label="Parent User"
                        placeholder="Enter username to copy from"
                        mb="md"
                    />
                    <Button onClick={field.validate}>Fetch</Button>
                </>
            )}
        </>
    );
}

export default GroupManager;

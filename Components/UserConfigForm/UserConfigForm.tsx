import { useState, useEffect, useContext } from "react";
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { readConfigRequest, readConfigResponse, writeConfigRequest } from "secure-electron-store";
import { GlobalContext } from "../../context/GlobalContext";

declare global {
    interface Window {
        api: any;
    }
}

export default function UserConfigForm() {
    const { formValues, setFormValues, setActiveTab } = useContext(GlobalContext);

    const [active, setActive] = useState(0);
    const [visible, { toggle }] = useDisclosure(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            jira_url: "",
            jira_token: "",
            conf_url: "",
            conf_token: "",
            password: "",
            confirm_password: "",
        },

        validate: (values) => {
            if (active === 0) {
                return {
                    name: values.name.trim().length < 2 ? "Name must include at least 2 characters" : null,
                };
            }

            if (active === 1) {
                return {
                    jira_token: values.jira_token.trim().length < 1 ? "Token must include at least 1 characters" : null,
                    conf_token: values.conf_token.trim().length < 1 ? "Token must include at least 1 characters" : null,
                    jira_url:
                        values.jira_url.trim().length < 1
                            ? "Invalid URL. Please enter a valid Jira website URL."
                            : null,
                    conf_url:
                        values.conf_url.trim().length < 1
                            ? "Invalid URL. Please enter a valid Jira website URL."
                            : null,
                };
            }

            if (active === 2) {
                return {
                    password: values.password.trim().length < 3 ? "Password must be atleast 4 characters" : null,
                    confirm_password:
                        values.confirm_password.trim().length < 3
                            ? "Password must be atleast 4 characters"
                            : values.password != values.confirm_password
                            ? "Passwords do not match"
                            : null,
                };
            }

            return {};
        },
    });

    useEffect(() => {
        // set the active tab once , and set active form stepper to the end
        setActiveTab({ value: "Config File" });
        setActive(3);
    }, []);

    useEffect(() => {
        window.api.store.send(readConfigRequest, "data");
        window.api.store.onReceive(readConfigResponse, function (args: any) {
            if (args.success && args.value) {
                form.setValues(args.value);
                setFormValues(args.value);
            }
        });
    }, [active == 3]);

    const clearStore = () => {
        window.api.store.send(writeConfigRequest, "data", null);
        form.reset();
        setFormValues({
            name: "",
            jira_url: "",
            jira_token: "",
            conf_url: "",
            conf_token: "",
            password: "",
            confirm_password: "",
        });
        setActive(0);
    };
    const nextStep = () => {
        setActive((current) => {
            if (form.validate().hasErrors) {
                return current;
            }
            if (current >= 2) {
                console.log("trigged save");
                window.api.store.send(writeConfigRequest, "data", form.getValues());
            }

            return current < 3 ? current + 1 : current;
        });
    };

    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    return (
        <>
            <Stepper active={active} p={"5%"}>
                <Stepper.Step label="First step" description="Profile settings">
                    <TextInput label="Name" placeholder="name" key={form.key("name")} {...form.getInputProps("name")} />
                </Stepper.Step>

                <Stepper.Step label="Second step" description="Tokens">
                    {/* <TextInput label="Name" placeholder="Name" key={form.key("name")} {...form.getInputProps("name")} /> */}
                    <TextInput
                        mt="md"
                        label="JIRA URL"
                        placeholder="JIRA Endpoint URL"
                        key={form.key("jira_url")}
                        {...form.getInputProps("jira_url")}
                    />
                    <TextInput
                        mt="md"
                        label="JIRA Token"
                        placeholder="URL Endpoint"
                        key={form.key("jira_token")}
                        {...form.getInputProps("jira_token")}
                    />
                    <TextInput
                        mt="md"
                        label="Confluence Token"
                        placeholder="Confluence URL Endpoint"
                        key={form.key("conf_url")}
                        {...form.getInputProps("conf_url")}
                    />
                    <TextInput
                        mt="md"
                        label="Confluence Token"
                        placeholder="<token>"
                        key={form.key("conf_token")}
                        {...form.getInputProps("conf_token")}
                    />
                </Stepper.Step>

                <Stepper.Step label="Final step" description="Pin">
                    <PasswordInput
                        label="Password"
                        visible={visible}
                        key={form.key("password")}
                        onVisibilityChange={toggle}
                        {...form.getInputProps("password")}
                    />
                    <PasswordInput
                        label="Confirm password"
                        visible={visible}
                        key={form.key("confirm_password")}
                        onVisibilityChange={toggle}
                        {...form.getInputProps("confirm_password")}
                    />
                </Stepper.Step>
                <Stepper.Completed>
                    Completed! Form values:
                    <Code block mt="xl">
                        {JSON.stringify(form.getValues(), null, 2)}
                    </Code>
                </Stepper.Completed>
            </Stepper>

            <Group justify="flex-end" mt="sm" mr={"5%"}>
                {active !== 0 && <Button onClick={prevStep}>Back</Button>}
                {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
                {active == 3 && (
                    <Button onClick={clearStore} variant="default">
                        Clear
                    </Button>
                )}
            </Group>
        </>
    );
}

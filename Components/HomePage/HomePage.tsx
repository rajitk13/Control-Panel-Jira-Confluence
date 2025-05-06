import { Button, Container, Group, Text, Anchor } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import { useContext, useEffect } from "react";

import classes from "./HomePage.module.css";
import Link from "next/link";
import { GlobalContext } from "../../context/GlobalContext";

function HomePage() {
    const { active, setActiveTab, formValues } = useContext(GlobalContext);
    useEffect(() => {
        console.log(formValues);
    }, []);
    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner} mt={"-8%"}>
                <h1 className={classes.title}>
                    A Simplified Control Pane for{" "}
                    <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
                        JIRA & Confluence
                    </Text>{" "}
                    for managing your atlassian needs!
                </h1>

                <Text className={classes.description} color="dimmed">
                    Build fully functional accessible web applications with ease – Mantine includes more than 100
                    customizable components and hooks to cover you in any situation
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        component="a"
                        href="/config"
                        gradient={{ from: "blue", to: "cyan" }}
                        onClick={() => setActiveTab({ value: "Config File" })}
                    >
                        Build Config
                    </Button>

                    <Button
                        component="a"
                        href="https://github.com/mantinedev/mantine"
                        size="xl"
                        variant="default"
                        className={classes.control}
                        leftSection={<GithubIcon size={20} />}
                    >
                        Source Code
                    </Button>
                </Group>
            </Container>
        </div>
    );
}

export default HomePage;

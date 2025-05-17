import { Button, Container, Group, Text, Anchor } from "@mantine/core";
import { GithubIcon } from "@mantinex/dev-icons";
import { useContext, useEffect } from "react";

import classes from "./HomePage.module.css";
import { GlobalContext } from "../../context/GlobalContext";
import getRandomGradient from "../../utilities/getRandomGradient";

function HomePage() {
    const { setActiveTab, formValues } = useContext(GlobalContext);
    const gradient = getRandomGradient();

    return (
        <div className={classes.wrapper}>
            <Container size={700} className={classes.inner} mt={"-8%"}>
                <div className={classes.title}>
                    <div>
                        {formValues.name && (
                            <Text component="span" variant="gradient" gradient={gradient} inherit>
                                Hi {formValues.name},
                            </Text>
                        )}
                    </div>
                    Welcome to Control Panel !
                    <div>
                        <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
                            JIRA & Confluence
                        </Text>{" "}
                        console for managing your administrative needs!
                    </div>
                </div>

                <Text className={classes.description} color="dimmed">
                    A central console which makes it easy for Jira & confluence admins to provided access to users,
                    perform administrative tasks, inject scripts from a store library to console faster than jira,
                    making worflow easier and faster!
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

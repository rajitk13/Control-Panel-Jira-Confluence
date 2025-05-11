import { Button, Group } from "@mantine/core";
import { AppShell, Burger, Skeleton, Switch, Flex } from "@mantine/core";

import { MantineLogo } from "@mantinex/mantine-logo";
import { IconCube } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }: any) {
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <IconCube />

                    <p>Control Panel | JIRA & Confluence </p>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Navbar />
            </AppShell.Navbar>
            <AppShell.Main m={30}>{children}</AppShell.Main>
        </AppShell>
    );
}

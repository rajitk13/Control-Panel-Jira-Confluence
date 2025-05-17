import { Paper, CopyButton, ScrollArea, Title, Tooltip, ActionIcon, List, Text } from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

function PaperCard(prop: any) {
    return (
        <Paper shadow="xs" p="xl">
            <Title order={5}>Confluence Groups</Title>
            <ScrollArea h={250}>
                {prop.data.length > 0 ? (
                    <List>
                        {prop.data.map((item: any, index: number) => (
                            <List.Item key={item?.name}>
                                {item?.name}
                                <CopyButton value={item?.name} timeout={2000}>
                                    {({ copied, copy }) => (
                                        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
                                            <ActionIcon
                                                color={copied ? "teal" : "gray"}
                                                variant="subtle"
                                                onClick={copy}
                                            >
                                                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                                            </ActionIcon>
                                        </Tooltip>
                                    )}
                                </CopyButton>
                            </List.Item>
                        ))}
                    </List>
                ) : (
                    <Text>No Groups found</Text>
                )}
            </ScrollArea>
        </Paper>
    );
}

export default PaperCard;

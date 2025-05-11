import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { readConfigRequest, readConfigResponse } from "secure-electron-store";
import { LoadingOverlay } from "@mantine/core";

declare global {
    interface Window {
        api: any;
    }
}

type FormValues = {
    name: string;
    jira_url: string;
    jira_token: string;
    conf_url: string;
    conf_token: string;
    password: string;
    confirm_password: string;
};

type Active = {
    value: string;
};

export interface GlobalContextInterface {
    active: Active;
    setActiveTab: Dispatch<SetStateAction<Active>>;
    formValues: FormValues;
    setFormValues: Dispatch<SetStateAction<FormValues>>;
}

// Set the default state for the context
const defaultState: GlobalContextInterface = {
    active: { value: "Home" },
    setActiveTab: () => {},
    formValues: {
        name: "",
        jira_url: "",
        jira_token: "",
        conf_url: "",
        conf_token: "",
        password: "",
        confirm_password: "",
    },
    setFormValues: () => {},
};

export const GlobalContext = createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
    children: React.ReactNode;
};

export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [active, setActiveTab] = useState<Active>({ value: "Home" });
    const [formValues, setFormValues] = useState<FormValues>(defaultState.formValues);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        window.api.store.clearRendererBindings();
        window.api.store.send(readConfigRequest, "data");

        const handleConfigResponse = (args: any) => {
            if (args.success && args.value) {
                setFormValues(args.value);
            }
            setIsLoading(false);
        };

        window.api.store.onReceive(readConfigResponse, handleConfigResponse);
    }, []);

    if (isLoading) {
        return <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />;
    }

    return (
        <GlobalContext.Provider value={{ active, setActiveTab, formValues, setFormValues }}>
            {children}
        </GlobalContext.Provider>
    );
}

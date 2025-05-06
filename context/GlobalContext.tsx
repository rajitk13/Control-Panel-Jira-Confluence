import React, { createContext, Dispatch, SetStateAction, useState } from "react";

// Define the structure of form values
type FormValues = {
    name: string;
    jira_token: string;
    conf_token: string;
    password: string;
    confirm_password: string;
};

// Define the Active structure
type Active = {
    value: string;
};

// Create a combined context interface to include active state and form values
export interface GlobalContextInterface {
    active: Active; // Existing active state
    setActiveTab: Dispatch<SetStateAction<Active>>; // Existing state updater for active tabs
    formValues: FormValues; // New form values
    setFormValues: Dispatch<SetStateAction<FormValues>>; // New state updater for form values
}

// Set the default state for the context
const defaultState: GlobalContextInterface = {
    active: {
        value: "Home",
    },
    setActiveTab: () => {},
    formValues: {
        name: "",
        jira_token: "",
        conf_token: "",
        password: "",
        confirm_password: "",
    },
    setFormValues: () => {},
};

// Create the context
export const GlobalContext = createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
    children: React.ReactNode;
};

// Create the provider component
export default function GlobalProvider({ children }: GlobalProviderProps) {
    const [active, setActiveTab] = useState<Active>({ value: "Home" });
    const [formValues, setFormValues] = useState<FormValues>({
        name: "",
        jira_token: "",
        conf_token: "",
        password: "",
        confirm_password: "",
    });

    return (
        <GlobalContext.Provider value={{ active, setActiveTab, formValues, setFormValues }}>
            {children}
        </GlobalContext.Provider>
    );
}

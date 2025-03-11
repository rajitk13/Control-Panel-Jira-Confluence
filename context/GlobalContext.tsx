import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type Active = {
    value: string;
};

export interface ActiveContextInterface {
    active: Active;
    setActive: Dispatch<SetStateAction<Active>>;
}
const defaultState = {
    active: {
        value: "Home",
    },
} as ActiveContextInterface;

export const ActiveContext = createContext<ActiveContextInterface>(defaultState);

type ActiveProviderProps = {
    children: React.ReactNode;
};

export default function ActiveProvider({ children }: ActiveProviderProps) {
    const [active, setActive] = useState<Active>({ value: "Home" });

    return <ActiveContext.Provider value={{ active, setActive }}>{children}</ActiveContext.Provider>;
}

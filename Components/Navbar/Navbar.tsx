import { useContext } from "react";
import Link from "next/link";
import { ActiveContext } from "../../context/GlobalContext";
import {
    Icon2fa,
    IconBellRinging,
    IconDatabaseImport,
    IconFingerprint,
    IconKey,
    IconLogout,
    IconReceipt2,
    IconSettings,
    IconSwitchHorizontal,
    IconJson,
    IconHome,
} from "@tabler/icons-react";

import classes from "./Navbar.module.css";

type contextType = {
    active: string;
    setActive: () => void;
};

const data = [
    { link: "/", label: "Home", icon: IconHome },
    { link: "/login", label: "Billing", icon: IconReceipt2 },
    { link: "", label: "Security", icon: IconFingerprint },
    { link: "", label: "SSH Keys", icon: IconKey },
    { link: "", label: "Databases", icon: IconDatabaseImport },
    { link: "/config", label: "Config File", icon: IconJson },
    { link: "", label: "Other Settings", icon: IconSettings },
];

export default function Navbar({ Component }: any) {
    const { active, setActive } = useContext(ActiveContext);
    const links = data.map((item) => (
        <Link
            className={classes.link}
            data-active={item.label === active.value || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                setActive({ value: item.label });
                console.log(active.value);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </Link>
    ));

    return (
        <div>
            <div className={classes.navbarMain}>{links}</div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </div>
    );
}

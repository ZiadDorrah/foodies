import Link from "next/link";
import logoImg from "@/assets/logo.png";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";
import styles from "./main-header.module.css";

export default function MainHeader() {

    return (
        <>
            <MainHeaderBackground />
            <header className={styles.header}>

                <Link className={styles.logo} href="/">
                    <Image src={logoImg} alt="Logo" priority />
                    NextLevel Foodies
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Foofies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}
"use client";

import React from "react";
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import logo from '../../public/FULL_LOGO_COLOR.png';
import Link from "next/link";

const Header: React.FC = () => (
    <header className={styles.header}>
        <Link href="/"><Image src={logo} alt="Learnwell Logo" width={150} height={50} /></Link>
        <h1>Learnwell Video Platform</h1>
    </header>
);

export default Header;
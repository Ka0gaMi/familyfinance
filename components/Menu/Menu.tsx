"use client"

import React from "react";
import styles from "./Menu.module.css";
import MenuLinks from "./MenuLinks/MenuLinks";
import LogoIcon from "../../assets/images/LogoIcon.svg"
import LogoutIcon from "../../assets/images/LogoutIcon.svg"

export default function Menu() {
  return (
    <div className={styles.Menu}>
      <div className={styles.Icon}>
        <LogoIcon width={40} height={40} />
      </div>
      <MenuLinks />
      <div className={styles.Logout}>
        <LogoutIcon width={25} height={25} />
      </div>
    </div>
  );
}
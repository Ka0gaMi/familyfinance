import React from "react";
import styles from "./page.module.css"
import Finance from "./components/finance/Finance";

export default function Money() {
  return (
    <div className={styles.Container}>
      <Finance />
    </div>
  )
}
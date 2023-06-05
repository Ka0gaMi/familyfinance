"use client"

import React from "react"
import Link from "next/link"
import styles from "./MenuLinks.module.css"
import HomeIcon from "../../../assets/images/HomeIcon.svg"
import CalendarIcon from "../../../assets/images/CalendarIcon.svg"
import MoneyIcon from "../../../assets/images/MoneyIcon.svg"
import FoodIcon from "../../../assets/images/FoodIcon.svg"
import RecipesIcon from "../../../assets/images/RecipesIcon.svg"
import { usePathname } from "next/navigation"

export default function MenuLinks() {

  const pathName = usePathname()

  return (
    <div className={styles.MenuIcons}>
      <Link href="/" className={pathName === "/" ? `${styles.Active}` : ''}>
        <HomeIcon width={25} height={25} />
      </Link>
      <Link href="/calendar" className={pathName === "/calendar" ? `${styles.Active}` : ''}>
        <CalendarIcon width={25} height={25} />
      </Link>
      <Link href="/money" className={pathName === "/money" ? `${styles.Active}` : ''}>
        <MoneyIcon width={25} height={25} />
      </Link>
      <Link href="/food" className={pathName === "/food" ? `${styles.Active}` : ''}>
        <FoodIcon width={25} height={25} />
      </Link>
      <Link href="/recipes" className={pathName === "/recipes" ? `${styles.Active}` : ''}>
        <RecipesIcon width={25} height={25} />
      </Link>
    </div>
  )
}
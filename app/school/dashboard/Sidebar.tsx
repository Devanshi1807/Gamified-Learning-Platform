"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaSchool,
  FaBullhorn,
  FaUniversity,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import LogoutButton from "@/components/school/LogoutButton";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  schoolName: string;
}

export default function Sidebar({ schoolName }: SidebarProps) {
  const pathname = usePathname();

  const mainNavigation = [
    {
      name: "Dashboard",
      href: "/school/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "Teachers",
      href: "/school/teachers",
      icon: FaChalkboardTeacher,
    },
    {
      name: "Classes",
      href: "/school/classes",
      icon: FaSchool,
    },
    {
      name: "Announcements",
      href: "/school/announcements",
      icon: FaBullhorn,
    },
  ];

  const schoolNavigation = [
    {
      name: "School Profile",
      href: "/school/profile",
      icon: FaUniversity,
    },
    {
      name: "Settings",
      href: "/school/settings",
      icon: FaCog,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* SCHOOL BRANDING */}
      <div className={styles.brand}>
        <div className={styles.logoContainer}>
          <img
            src="/nois_logo.png"
            alt="NOIS"
            className={styles.logo}
          />
        </div>

        <div className={styles.schoolInfo}>
          <h2>{schoolName}</h2>
          <p>School Administrator</p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* MAIN NAVIGATION */}
      <nav className={styles.navigation}>
        <p className={styles.sectionTitle}>MAIN</p>

        <div className={styles.navigationList}>
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                <span className={styles.icon}>
                  <Icon />
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* SCHOOL SECTION */}
        <p className={styles.sectionTitle}>SCHOOL</p>

        <div className={styles.navigationList}>
          {schoolNavigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                <span className={styles.icon}>
                  <Icon />
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className={styles.logoutSection}>
        <LogoutButton />
      </div>
    </aside>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaClipboardList,
  FaQuestionCircle,
  FaTrophy,
  FaMedal,
  FaBullhorn,
  FaUser,
  FaCog,
} from "react-icons/fa";

import styles from "./Sidebar.module.css";

interface SidebarProps {
    schoolName?: string;
  studentName?: string;
  className?: string;
  section?: string;
}

export default function Sidebar({
    schoolName = "Delhi Public School",
  studentName = "Akshat",
  className = "Class 8",
  section = "Section A",
}: SidebarProps) {
  const pathname = usePathname();

  const mainNavigation = [
    {
      name: "Dashboard",
      href: "/student/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "My Classes",
      href: "/student/classes",
      icon: FaBookOpen,
    },
    {
      name: "Assignments",
      href: "/student/assignments",
      icon: FaClipboardList,
    },
    {
      name: "Quizzes",
      href: "/student/quizzes",
      icon: FaQuestionCircle,
    },
    {
      name: "Leaderboard",
      href: "/student/leaderboard",
      icon: FaTrophy,
    },
    {
      name: "Achievements",
      href: "/student/achievements",
      icon: FaMedal,
    },
    {
      name: "Announcements",
      href: "/student/announcements",
      icon: FaBullhorn,
    },
  ];

  const accountNavigation = [
    {
      name: "Profile",
      href: "/student/profile",
      icon: FaUser,
    },
    {
      name: "Settings",
      href: "/student/settings",
      icon: FaCog,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* BRAND */}
      <div className={styles.brand}>
        <div className={styles.logoContainer}>
          <img src="/nois_logo.png" alt="NOIS" className={styles.logo} />
        </div>

        <div className={styles.brandText}>
          <h2>NOIS</h2>
          <p>Learning Platform</p>
        </div>
      </div>

      {/* STUDENT */}
      <div className={styles.studentCard}>
        <div className={styles.schoolInfo}>
          <span className={styles.schoolLabel}>SCHOOL</span>
          <h3>{schoolName}</h3>

          <p>
            {studentName} • {className} • {section}
          </p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* MAIN NAVIGATION */}
      <nav className={styles.navigation}>
        <p className={styles.sectionTitle}>LEARN</p>

        <div className={styles.navigationList}>
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              >
                <span className={styles.icon}>
                  <Icon />
                </span>

                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ACCOUNT */}
        <p className={styles.sectionTitle}>ACCOUNT</p>

        <div className={styles.navigationList}>
          {accountNavigation.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
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
        <button type="button">
          <span className={styles.logoutIcon}>↪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

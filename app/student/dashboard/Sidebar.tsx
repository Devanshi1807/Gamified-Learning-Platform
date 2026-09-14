"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaHeart,
  FaGamepad,
  FaBolt,
  FaTrophy,
  FaMedal,
  FaQuestionCircle,
  FaClipboardList,
  FaCalendarAlt,
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

  const learnNavigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: FaTachometerAlt },
    {
      name: "NCERT Made Interactive",
      href: "/student/ncert",
      icon: FaBookOpen,
    },
    {
      name: "Life Skills \u2014 Beyond NCERT",
      href: "/student/life-skills",
      icon: FaHeart,
    },
    { name: "Fun Zone", href: "/student/fun-zone", icon: FaGamepad },
    { name: "Daily Challenges", href: "/student/challenges", icon: FaBolt },
  ];

  const communityNavigation = [
    { name: "Leaderboard", href: "/student/leaderboard", icon: FaTrophy },
    { name: "Badges & Rewards", href: "/student/achievements", icon: FaMedal },
    {
      name: "Doubt Centre",
      href: "/student/doubt-centre",
      icon: FaQuestionCircle,
    },
  ];

  const adminNavigation = [
    {
      name: "Assignments",
      href: "/student/assignments",
      icon: FaClipboardList,
    },
    { name: "Events", href: "/student/events", icon: FaCalendarAlt },
    { name: "Settings", href: "/student/settings", icon: FaCog },
  ];

  const renderNavGroup = (items: typeof learnNavigation) =>
    items.map((item) => {
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
          <span className={styles.navLabel}>{item.name}</span>
        </Link>
      );
    });

  const handleLogout = async () => {
    try {
      await fetch("/api/school/logout", {
        method: "POST",
      });
    } catch {
      // Even if the logout API fails, continue to the main page.
    } finally {
      window.location.href = "/";
    }
  };

  return (
    <aside className={styles.sidebar}>
      {/* BRAND */}
      <Link href="/" className={styles.brand}>
        <div className={styles.logoContainer}>
          <img src="/nois_logo.png" alt="NOIS" className={styles.logo} />
        </div>

        <div className={styles.brandText}>
          <h2>NOIS</h2>
          <p>Learning Platform</p>
        </div>
      </Link>

      {/* STUDENT */}
      <div className={styles.studentCard}>
        <div className={styles.schoolInfo}>
          <span className={styles.schoolLabel}>SCHOOL</span>
          <h3>{schoolName}</h3>
          <p>
            {studentName} · {className} · {section}
          </p>
        </div>
      </div>

      <div className={styles.divider} />

      {/* NAVIGATION */}
      <nav className={styles.navigation}>
        <p className={styles.sectionTitle}>LEARN</p>
        <div className={styles.navigationList}>
          {renderNavGroup(learnNavigation)}
        </div>

        <p className={styles.sectionTitle}>COMMUNITY</p>
        <div className={styles.navigationList}>
          {renderNavGroup(communityNavigation)}
        </div>

        <p className={styles.sectionTitle}>ADMIN</p>
        <div className={styles.navigationList}>
          {renderNavGroup(adminNavigation)}
        </div>
      </nav>

      {/* LOGOUT */}
      <div className={styles.logoutSection}>
        <button type="button" onClick={handleLogout}>
          <span className={styles.logoutIcon}></span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

"use client";

import {
  LayoutDashboard,
  UsersRound,
  GraduationCap,
  BookOpen,
  Megaphone,
  CalendarDays,
  CalendarCheck,
  BriefcaseBusiness,
  School,
  Settings,
  X,
  
  MapPin,
  UserPlus,
} from "lucide-react";

import styles from "./Sidebar.module.css";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.open : styles.closed
      }`}
    >
      <div className={styles.sidebarTop}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={21} />
        </button>

<div className={styles.logo}>
  <img
    src="/nois_logo.png"
    alt="NOIS Logo"
  />
</div>

        <div className={styles.schoolInfo}>
          <h3>Test School</h3>
          <p>School Administrator</p>
        </div>
      </div>

      <nav className={styles.navigation}>
        <div className={styles.sectionTitle}>MAIN</div>

        <a className={`${styles.navItem} ${styles.active}`}>
          <LayoutDashboard size={21} />
          <span>Dashboard</span>
        </a>

        <a className={styles.navItem}>
          <UsersRound size={21} />
          <span>Teachers</span>
        </a>

        <a className={styles.navItem}>
          <GraduationCap size={21} />
          <span>Students</span>
        </a>

        <a className={styles.navItem}>
          <BookOpen size={21} />
          <span>Classes</span>
        </a>

        <a className={styles.navItem}>
          <Megaphone size={21} />
          <span>Announcements</span>
        </a>

        <div className={styles.divider} />

        <div className={styles.sectionTitle}>MORE</div>

        <a className={styles.navItem}>
          <CalendarDays size={21} />
          <span>Timetable</span>
        </a>

        <a className={styles.navItem}>
          <CalendarCheck size={21} />
          <span>Exam Time Table</span>
        </a>

        <a className={styles.navItem}>
          <BriefcaseBusiness size={21} />
          <span>Records</span>
        </a>

        <div className={styles.divider} />

        <div className={styles.sectionTitle}>SCHOOL</div>

        <a className={styles.navItem}>
          <School size={21} />
          <span>School Profile</span>
        </a>

        <a className={styles.navItem}>
          <Settings size={21} />
          <span>Settings</span>
        </a>
      </nav>

      

      <div className={styles.profile}>
        <div className={styles.avatar}>NA</div>

        <div className={styles.profileInfo}>
          <strong>Nikhil Admin</strong>
          <span>Administrator</span>
        </div>

        <span className={styles.profileArrow}>⌄</span>
      </div>
    </aside>
  );
}
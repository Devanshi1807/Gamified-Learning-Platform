"use client";

import {
  Menu,
  Bell,
  ChevronDown,
} from "lucide-react";

import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  return (
    <header className={styles.header}>
      <button
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <div className={styles.headerRight}>
        <button className={styles.notification}>
          <Bell size={22} />

          <span className={styles.badge}>3</span>
        </button>

        <div className={styles.adminProfile}>
          <div className={styles.avatar}>NA</div>

          <div className={styles.adminInfo}>
            <strong>Nikhil Admin</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown
            size={18}
            className={styles.chevron}
          />
        </div>
      </div>
    </header>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";

import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({
  onMenuClick,
}: DashboardHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    // Change this if your login page has a different route
    window.location.href = "/school/login";
  };

  return (
    <header className={styles.header}>
      {/* MENU BUTTON */}
      <button
        className={styles.menuButton}
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
      >
        <Menu size={22} />
      </button>

      <div className={styles.headerRight}>
        {/* NOTIFICATION */}
        <button
          className={styles.notification}
          aria-label="Notifications"
        >
          <Bell size={22} />

          <span className={styles.badge}>3</span>
        </button>

        {/* ADMIN PROFILE */}
        <div
          className={styles.profileWrapper}
          ref={profileRef}
        >
          <button
            type="button"
            className={styles.adminProfile}
            onClick={() =>
              setProfileOpen((prev) => !prev)
            }
            aria-expanded={profileOpen}
            aria-haspopup="menu"
          >
            <div className={styles.avatar}>NA</div>

            <div className={styles.adminInfo}>
              <strong>Nikhil Admin</strong>
              <span>Administrator</span>
            </div>

            <ChevronDown
              size={18}
              className={`${styles.chevron} ${
                profileOpen
                  ? styles.chevronOpen
                  : ""
              }`}
            />
          </button>

          {/* DROPDOWN */}
          {profileOpen && (
            <div
              className={styles.profileDropdown}
              role="menu"
            >
              {/* PROFILE */}
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                <User size={17} />

                <span>Profile</span>
              </button>

              {/* SETTINGS */}
              <button
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setProfileOpen(false);

                  window.location.href =
                    "/school/settings";
                }}
              >
                <Settings size={17} />

                <span>Settings</span>
              </button>

              {/* DIVIDER */}
              <div className={styles.dropdownDivider} />

              {/* LOGOUT */}
              <button
                type="button"
                className={`${styles.dropdownItem} ${styles.logoutItem}`}
                onClick={handleLogout}
              >
                <LogOut size={17} />

                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
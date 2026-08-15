"use client";

import { useState } from "react";
import { FaChevronDown, FaCalendarAlt } from "react-icons/fa";

import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  schoolName: string;
}

export default function DashboardHeader({
  schoolName,
}: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sessions = [
    "2025–26",
    "2024–25",
    "2023–24",
  ];

  const [selectedSession, setSelectedSession] =
    useState(sessions[0]);

  const handleSessionSelect = (session: string) => {
    setSelectedSession(session);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headingSection}>
        <p className={styles.eyebrow}>
          SCHOOL ADMINISTRATION
        </p>

        <h1>Dashboard</h1>

        <p className={styles.subtitle}>
          Manage and monitor {schoolName} from one place.
        </p>
      </div>

      <div className={styles.sessionSection}>
        <span className={styles.sessionLabel}>
          Academic Session
        </span>

        <div className={styles.dropdownWrapper}>
          <button
            type="button"
            className={styles.sessionButton}
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <span className={styles.calendarIcon}>
              <FaCalendarAlt />
            </span>

            <span>{selectedSession}</span>

            <FaChevronDown
              className={`${styles.chevron} ${
                isOpen ? styles.chevronOpen : ""
              }`}
            />
          </button>

          {isOpen && (
            <div
              className={styles.dropdown}
              role="listbox"
            >
              {sessions.map((session) => (
                <button
                  key={session}
                  type="button"
                  className={`${styles.dropdownItem} ${
                    selectedSession === session
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() =>
                    handleSessionSelect(session)
                  }
                  role="option"
                  aria-selected={
                    selectedSession === session
                  }
                >
                  {session}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
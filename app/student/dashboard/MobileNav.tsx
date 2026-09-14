"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import styles from "./MobileNav.module.css";

interface MobileNavProps {
  schoolName?: string;
  studentName?: string;
  className?: string;
  section?: string;
}

export default function MobileNav({
  schoolName,
  studentName,
  className,
  section,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.mobileHeader}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
        >
          <FaBars />
        </button>

        <a href="/" className={styles.brand}>
  <img src="/nois_logo.png" alt="NOIS" />
  <div>
    <strong>NOIS</strong>
    <span>Learning Platform</span>
  </div>
</a>
      </header>

      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <FaTimes />
        </button>

        <Sidebar
          schoolName={schoolName}
          studentName={studentName}
          className={className}
          section={section}
        />
      </div>
    </>
  );
}
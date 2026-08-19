"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.dashboard}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div
        className={`${styles.mainArea} ${
          sidebarOpen ? styles.withSidebar : styles.fullWidth
        }`}
      >
        <DashboardHeader
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className={styles.content}>
          <div className={styles.welcomeSection}>
            <div>
              <div className={styles.welcomeSmall}>
                ✣ &nbsp; WELCOME BACK, NIKHIL 👋
              </div>

              <h1>Welcome, Test School</h1>

              <p>Here's what's happening in your school today.</p>
            </div>

            <div className={styles.dateCard}>
              <div className={styles.calendarIcon}>▣</div>

              <div>
                <strong>May 23, 2025</strong>
                <span>Friday</span>
              </div>
            </div>
          </div>

          <section className={styles.statsGrid}>
            <StatCard
              type="teachers"
              title="Teachers"
              value="80"
              description="Teachers in your school"
            />

            <StatCard
              type="students"
              title="Students"
              value="750"
              description="Students enrolled"
            />

            <StatCard
              type="classes"
              title="Classes"
              value="10"
              description="Active classes"
            />
          </section>

          <QuickActions />

          <RecentActivity />
        </main>
      </div>
    </div>
  );
}
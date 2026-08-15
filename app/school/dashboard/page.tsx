import { redirect } from "next/navigation";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSchool,
} from "react-icons/fa";

import { getAuthenticatedSchool } from "@/lib/auth";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

import StatCard from "./StatCard";
import RecentActivity from "./RecentActivity";
import QuickActions from "./QuickActions";

import styles from "./dashboard.module.css";

export default async function SchoolDashboardPage() {
  const school = await getAuthenticatedSchool();

  if (!school) {
    redirect("/school/login");
  }

  return (
    <>
      <Sidebar schoolName={school.school_name} />

      <main className={styles.dashboard}>
        <DashboardHeader
          schoolName={school.school_name}
        />

        <div className={styles.content}>
          {/* WELCOME */}
          <section className={styles.welcome}>
            <p>WELCOME BACK 👋</p>

            <h1>
              Welcome, {school.school_name}
            </h1>

            <span>
              Here's what's happening in your school today.
            </span>
          </section>

          {/* STATISTICS */}
          <section className={styles.statsGrid}>
            <StatCard
              title="Teachers"
              value={80}
              description="Teachers in your school"
              icon={FaChalkboardTeacher}
              variant="teachers"
            />

            <StatCard
              title="Students"
              value={750}
              description="Students enrolled"
              icon={FaUserGraduate}
              variant="students"
            />

            <StatCard
              title="Classes"
              value={10}
              description="Active classes"
              icon={FaSchool}
              variant="classes"
            />
          </section>

          <QuickActions />

          {/* RECENT ACTIVITY */}
          <RecentActivity />
        </div>
      </main>
    </>
  );
}
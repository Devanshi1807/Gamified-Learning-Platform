import Sidebar from "./Sidebar";
import styles from "./dashboard.module.css";
import RightSidebar from "./RightSidebar";
import Greeting from "./Greeting";
import SubjectCards from "./ProgressSection";
import MobileNav from "./MobileNav";
import RecentActivity from "./SubjectGrid";
import QuickActions from "./QuickActions";

export default function StudentDashboardPage() {
  return (
    <>
      <Sidebar />

      <MobileNav
        schoolName="Delhi Public School"
        studentName="Akshat"
        className="Class 8"
        section="Section A"
      />

      <main className={styles.dashboard}>
        <div className={styles.content}>
          <div className={styles.mainLayout}>
            {/* MAIN LEARNING AREA */}
            <div className={styles.mainColumn}>
              <Greeting
                studentName="Akshat"
                className="Class 8"
                section="Section A"
              />

              <SubjectCards />

              <RecentActivity />

              <QuickActions />
            </div>

            {/* RIGHT PANEL */}
            <RightSidebar />
          </div>
        </div>
      </main>
    </>
  );
}

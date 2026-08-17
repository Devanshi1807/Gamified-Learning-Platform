import Sidebar from "./Sidebar";
import styles from "./dashboard.module.css";
import ProgressSection from "./ProgressSection";
import SubjectGrid from "./SubjectGrid";
import RightSidebar from "./RightSidebar";
import Greeting from "./Greeting";

export default function StudentDashboardPage() {
  return (
    <>
      <Sidebar />

      <main className={styles.dashboard}>
        <div className={styles.content}>
          <div className={styles.mainLayout}>
            {/* MAIN LEARNING AREA */}
            <div>
              <Greeting
                studentName="Akshat"
                className="Class 8"
                section="Section A"
              />

              <ProgressSection />

              <SubjectGrid />
            </div>

            {/* RIGHT SIDEBAR */}
            <RightSidebar />
          </div>
        </div>
      </main>
    </>
  );
}

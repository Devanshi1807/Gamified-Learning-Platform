import {
  FaFire,
  FaTrophy,
  FaMedal,
  FaStar,
  FaBolt,
} from "react-icons/fa";

import styles from "./RightSidebar.module.css";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: "medal" | "star" | "fire" | "bolt";
}

interface RightSidebarProps {
  currentStreak?: number;
  streakGoal?: number;
  achievements?: Achievement[];
}

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: "First Quiz",
    description: "Completed your first quiz",
    icon: "medal",
  },
  {
    id: 2,
    title: "Quick Learner",
    description: "Completed 5 lessons",
    icon: "star",
  },
  {
    id: 3,
    title: "7-Day Streak",
    description: "Learned for 7 days in a row",
    icon: "fire",
  },
];

export default function RightSidebar({
  currentStreak = 12,
  streakGoal = 50,
  achievements = defaultAchievements,
}: RightSidebarProps) {
  const streakPercentage = Math.min(
    (currentStreak / streakGoal) * 100,
    100
  );

  const renderAchievementIcon = (
    icon: Achievement["icon"]
  ) => {
    switch (icon) {
      case "medal":
        return <FaMedal />;

      case "star":
        return <FaStar />;

      case "fire":
        return <FaFire />;

      case "bolt":
        return <FaBolt />;

      default:
        return <FaTrophy />;
    }
  };

  return (
    <aside className={styles.sidebar}>

      {/* =========================
          STREAK
      ========================= */}

      <section className={styles.streakCard}>
        <div className={styles.streakHeader}>
          <div>
            <span className={styles.eyebrow}>
              YOUR STREAK
            </span>

            <h2>50-Day Challenge</h2>
          </div>

          <div className={styles.fireIcon}>
            <FaFire />
          </div>
        </div>

        <div className={styles.streakNumber}>
          <strong>{currentStreak}</strong>

          <span>
            / {streakGoal} days
          </span>
        </div>

        <div className={styles.streakBar}>
          <div
            className={styles.streakValue}
            style={{
              width: `${streakPercentage}%`,
            }}
          />
        </div>

        <div className={styles.streakFooter}>
          <span>
            {currentStreak} days completed
          </span>

          <span>
            {Math.max(streakGoal - currentStreak, 0)} to go
          </span>
        </div>

        <p className={styles.streakMessage}>
          Keep learning every day! 🔥
        </p>
      </section>


      {/* =========================
          ACHIEVEMENTS
      ========================= */}

      <section className={styles.achievementsCard}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.eyebrow}>
              REWARDS
            </span>

            <h2>Latest Achievements</h2>
          </div>

          <FaTrophy className={styles.trophyIcon} />
        </div>

        <div className={styles.achievementList}>
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={styles.achievement}
            >
              <div className={styles.achievementIcon}>
                {renderAchievementIcon(
                  achievement.icon
                )}
              </div>

              <div className={styles.achievementContent}>
                <h3>{achievement.title}</h3>

                <p>{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className={styles.viewAll}>
          View all achievements
          <span>→</span>
        </button>
      </section>

    </aside>
  );
}
import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Terms & Conditions | NOIS",
  description: "Terms and conditions for using the NOIS platform.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.brand}>
            NOIS
          </Link>

          <Link href="/school/register" className={styles.backLink}>
            ← Back to registration
          </Link>
        </div>

        <article className={styles.document}>
          <header className={styles.header}>
            <h1>Terms &amp; Conditions</h1>

            <p>
              These terms govern the use of the NOIS school management
              and gamified learning platform.
            </p>

            <span className={styles.updated}>
              Last updated: 5 August 2026
            </span>
          </header>

          <section className={styles.section}>
            <h2>1. Acceptance of these terms</h2>

            <p>
              By registering a school, creating an account or using
              NOIS, you agree to these Terms &amp; Conditions and our
              Privacy Policy.
            </p>

            <p>
              A person registering a school confirms that they have
              authority to act on behalf of that school.
            </p>
          </section>

          <section className={styles.section}>
            <h2>2. The NOIS platform</h2>

            <p>
              NOIS provides digital tools for schools, teachers and
              students. Features may include:
            </p>

            <ul>
              <li>Gamified subject and chapter-based learning</li>
              <li>Student and teacher account management</li>
              <li>Attendance and academic progress tracking</li>
              <li>Timetable and examination management</li>
              <li>Points, badges, rewards and leaderboards</li>
              <li>Reports, dashboards and analytics</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. School accounts</h2>

            <p>
              Schools must provide accurate registration information
              and keep account details updated.
            </p>

            <p>
              The school is responsible for managing teacher and
              student accounts created through its workspace and for
              deciding which authorised users may access school data.
            </p>
          </section>

          <section className={styles.section}>
            <h2>4. Student accounts</h2>

            <p>
              Student accounts should only be created by an authorised
              school, teacher, parent or guardian as required by
              applicable law and school policy.
            </p>

            <p>
              Schools are responsible for obtaining any permissions or
              consents required before providing student information to
              NOIS.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Account security</h2>

            <p>
              Users must protect their passwords and login details.
              Accounts must not be shared with unauthorised people.
            </p>

            <p>
              Users should immediately report suspected unauthorised
              access or account misuse.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Acceptable use</h2>

            <p>Users must not:</p>

            <ul>
              <li>Use NOIS for unlawful or harmful activities</li>
              <li>Harass, threaten or impersonate another person</li>
              <li>Upload malicious code or attempt to damage the platform</li>
              <li>Access another user&apos;s account without permission</li>
              <li>Copy or commercially exploit platform content without permission</li>
              <li>Manipulate points, rewards, scores or leaderboards</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>7. Points, badges and rewards</h2>

            <p>
              Points, badges, virtual items and leaderboard positions
              are educational and motivational features. They have no
              monetary value and cannot be exchanged for cash unless a
              specific programme expressly states otherwise.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Intellectual property</h2>

            <p>
              NOIS branding, interface designs, software, original
              learning activities and platform content remain the
              property of their respective owners.
            </p>

            <p>
              Schools retain ownership of content and records they
              upload, subject to the permissions required for NOIS to
              host and process that content.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. Platform availability</h2>

            <p>
              We may update, improve, replace or temporarily suspend
              platform features for maintenance, security or technical
              reasons.
            </p>

            <p>
              We do not guarantee that every feature will always be
              available without interruption.
            </p>
          </section>

          <section className={styles.section}>
            <h2>10. Suspension and termination</h2>

            <p>
              Access may be suspended or terminated where an account
              violates these terms, creates a security risk or is used
              unlawfully.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Limitation of responsibility</h2>

            <p>
              NOIS is an educational and administrative technology
              platform. Schools and educators remain responsible for
              academic, disciplinary, safeguarding and administrative
              decisions made using platform information.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Changes to these terms</h2>

            <p>
              We may update these terms when the platform, its
              services or applicable requirements change. The updated
              date will be displayed at the top of this page.
            </p>
          </section>

          <section className={styles.section}>
            <h2>13. Contact</h2>

            <p>
              Questions about these terms can be sent to:
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:legal@your-domain.com">
                legal@your-domain.com
              </a>
            </p>
          </section>

          <div className={styles.notice}>
            Replace the example contact email and have these terms
            reviewed by a qualified legal professional before publicly
            launching the platform.
          </div>

          <div className={styles.footerLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/school/register">School Registration</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
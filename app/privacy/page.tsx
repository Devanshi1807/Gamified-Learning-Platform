import Link from "next/link";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy | NOIS",
  description: "Privacy policy for the NOIS learning platform.",
};

export default function PrivacyPage() {
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
            <h1>Privacy Policy</h1>

            <p>
              This policy explains what information NOIS may collect,
              why it is used and how it is protected.
            </p>

            <span className={styles.updated}>
              Last updated: 5 August 2026
            </span>
          </header>

          <section className={styles.section}>
            <h2>1. Information we collect</h2>

            <p>
              Depending on the features being used, NOIS may collect:
            </p>

            <ul>
              <li>
                School name, address, email, phone number and
                administrative details
              </li>

              <li>
                Administrator, teacher, parent and student names and
                account identifiers
              </li>

              <li>
                Class, section, subject, attendance and timetable
                information
              </li>

              <li>
                Learning progress, answers, scores, points, badges and
                activity history
              </li>

              <li>
                Account login, security and authentication information
              </li>

              <li>
                Device, browser, error and technical diagnostic
                information
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>2. How information is collected</h2>

            <p>Information may be provided by:</p>

            <ul>
              <li>The school during registration</li>
              <li>Authorised school administrators and teachers</li>
              <li>Students or parents using permitted platform features</li>
              <li>Google when a user chooses Google authentication</li>
              <li>Automatic technical and security logs</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>3. Why information is used</h2>

            <p>We may use information to:</p>

            <ul>
              <li>Create and secure user accounts</li>
              <li>Provide gamified educational activities</li>
              <li>Display progress, scores, rewards and achievements</li>
              <li>Manage classes, teachers, students and timetables</li>
              <li>Generate attendance, examination and performance reports</li>
              <li>Provide technical support</li>
              <li>Prevent misuse, fraud and security incidents</li>
              <li>Improve platform reliability and accessibility</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>4. Google authentication</h2>

            <p>
              When Google sign-in is selected, Google may provide basic
              account information such as the user&apos;s name, email
              address, profile image and account identifier.
            </p>

            <p>
              A user&apos;s Google password is not provided to NOIS.
              Google&apos;s own terms and privacy policies also apply
              to Google authentication.
            </p>
          </section>

          <section className={styles.section}>
            <h2>5. Children&apos;s and student data</h2>

            <p>
              NOIS is designed for use by educational institutions,
              teachers and students. Student accounts should be created
              only through an authorised school, teacher, parent or
              guardian.
            </p>

            <p>
              Schools must ensure that appropriate notices,
              authorisations and parent or guardian consents have been
              obtained where legally required.
            </p>

            <p>
              NOIS will not knowingly use children&apos;s information
              for targeted advertising.
            </p>
          </section>

          <section className={styles.section}>
            <h2>6. Sharing information</h2>

            <p>
              Personal information may be shared only when reasonably
              necessary with:
            </p>

            <ul>
              <li>The school that manages the user&apos;s account</li>
              <li>Authorised teachers and school administrators</li>
              <li>
                Hosting, database, authentication, email and technical
                service providers
              </li>
              <li>
                Authorities when disclosure is legally required
              </li>
            </ul>

            <p>
              Personal information is not sold to advertisers.
            </p>
          </section>

          <section className={styles.section}>
            <h2>7. Data retention</h2>

            <p>
              Information will be retained only for as long as needed
              to provide the platform, maintain required records,
              resolve disputes, protect security or comply with legal
              obligations.
            </p>
          </section>

          <section className={styles.section}>
            <h2>8. Data security</h2>

            <p>
              We use reasonable technical and organisational measures
              designed to protect information from unauthorised access,
              loss, alteration and disclosure.
            </p>

            <p>
              No online system can guarantee absolute security. Schools
              and users must also protect their passwords and devices.
            </p>
          </section>

          <section className={styles.section}>
            <h2>9. User choices and rights</h2>

            <p>
              Subject to applicable requirements, users or authorised
              representatives may request:
            </p>

            <ul>
              <li>Access to relevant personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of information no longer required</li>
              <li>Withdrawal of consent where processing relies on consent</li>
              <li>Information about how their data is processed</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>10. Cookies and local storage</h2>

            <p>
              NOIS may use cookies or browser storage to maintain login
              sessions, remember preferences, protect accounts and
              improve platform performance.
            </p>
          </section>

          <section className={styles.section}>
            <h2>11. Policy updates</h2>

            <p>
              This policy may be updated as the platform, its features
              or applicable requirements change. The latest revision
              date will appear at the top of this page.
            </p>
          </section>

          <section className={styles.section}>
            <h2>12. Privacy contact</h2>

            <p>
              Privacy questions and requests can be sent to:
            </p>

            <p>
              <strong>Email:</strong>{" "}
              <a href="shreyalakhiwal@gmail.com">
                privacy@your-domain.com
              </a>
            </p>
          </section>

          <div className={styles.notice}>
            Replace the example contact email and update this policy
            after choosing your actual database, hosting, analytics and
            communication providers.
          </div>

          <div className={styles.footerLinks}>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <Link href="/school/register">School Registration</Link>
          </div>
        </article>
      </div>
    </main>
  );
}
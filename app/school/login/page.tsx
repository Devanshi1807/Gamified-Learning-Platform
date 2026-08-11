"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSchool, FaShieldAlt, FaKey } from "react-icons/fa";

import styles from "./login.module.css";

export default function SchoolLoginPage() {
  const router = useRouter();

  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!schoolId.trim()) {
      setError("Please enter your School ID.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/school/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schoolId: schoolId.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid School ID or password.");
        return;
      }

      setSuccessMessage("Login successful!");

      setTimeout(() => {
        router.push("/school/dashboard");
      }, 500);
    } catch (error) {
      console.error("Login request failed:", error);

      setError("Unable to connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      <Link href="/" className={styles.backButton}>
        <FaArrowLeft />
        <span>Back</span>
      </Link>

      <section className={styles.loginCard}>
        {/* LEFT PANEL */}
        <aside className={styles.informationPanel}>
          <div className={styles.logoSection}>
            <img
              src="/nois_logo.png"
              alt="NOIS logo"
              className={styles.logoImage}
            />
          </div>

          <div className={styles.informationContent}>
            <h1>
              Welcome
              <br />
              <span className={styles.exceptionalText}>Back.</span>
            </h1>

            <div className={styles.headingLine} />

            <p className={styles.introduction}>
              Manage your school, teachers, students and learning activities
              from one unified platform.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaShieldAlt />
                </span>

                <span>Secure School Access</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaKey />
                </span>

                <span>Protected Login</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaSchool />
                </span>

                <span>Manage Your School</span>
              </div>
            </div>
          </div>

          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />

          {/* <img
            src="/school-campus.png"
            alt="School campus"
            className={styles.schoolImage}
          /> */}
        </aside>

        {/* RIGHT PANEL */}
        <section className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.formHeading}>
              <span className={styles.mobileLogo}>
                <FaSchool />
              </span>

              <div>
                <h2>School Login</h2>
                <p>Enter your school credentials to continue.</p>
              </div>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {successMessage && (
              <div className={styles.successMessage}>{successMessage}</div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              {/* SCHOOL ID */}
              <div className={styles.formGroup}>
                <label htmlFor="schoolId">School ID</label>

                <div className={styles.inputWrapper}>
                  <FaSchool />

                  <input
                    id="schoolId"
                    type="text"
                    placeholder="Enter your School ID"
                    value={schoolId}
                    onChange={(event) => setSchoolId(event.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>

                <div className={styles.inputWrapper}>
                  <FaKey />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                <FaShieldAlt />

                <span>{isSubmitting ? "Logging in..." : "Login"}</span>
              </button>
            </form>

            <p className={styles.registerText}>
              Don't have a school account?{" "}
              <Link href="/school/register">Register your school</Link>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}

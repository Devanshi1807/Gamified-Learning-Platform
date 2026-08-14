"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaGraduationCap, FaKey, FaUserGraduate } from "react-icons/fa";

import styles from "./login.module.css";

export default function Page() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    if (!studentId.trim()) {
      setError("Please enter your Student ID.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    /*
     * Backend will be connected later.
     *
     * POST /api/student/login
     *
     * {
     *   studentId,
     *   password
     * }
     */

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log({
        studentId,
        password,
      });

      // Temporary only
      setError("Student login backend is not connected yet.");
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
              <span className={styles.highlightText}>Student.</span>
            </h1>

            <div className={styles.headingLine} />

            <p className={styles.introduction}>
              Access your classes, learning activities,
              achievements and progress from one place.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaUserGraduate />
                </span>
                <span>Your Learning Dashboard</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaGraduationCap />
                </span>
                <span>Track Your Progress</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaKey />
                </span>
                <span>Secure Student Access</span>
              </div>
            </div>
          </div>

          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />
          
        </aside>

        {/* RIGHT PANEL */}
        <section className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.formHeading}>
              <span className={styles.mobileLogo}>
                <FaUserGraduate />
              </span>

              <div>
                <h2>Student Login</h2>
                <p>
                  Enter your student credentials to continue.
                </p>
              </div>
            </div>

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className={styles.loginForm}
            >
              {/* STUDENT ID */}
              <div className={styles.formGroup}>
                <label htmlFor="studentId">
                  Student ID
                </label>

                <div className={styles.inputWrapper}>
                  <FaUserGraduate />

                  <input
                    id="studentId"
                    type="text"
                    placeholder="Enter your Student ID"
                    value={studentId}
                    onChange={(event) =>
                      setStudentId(event.target.value)
                    }
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className={styles.formGroup}>
                <label htmlFor="password">
                  Password
                </label>

                <div className={styles.inputWrapper}>
                  <FaKey />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <div className={styles.forgotPassword}>
                <Link href="/student/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                <FaGraduationCap />

                <span>
                  {isSubmitting
                    ? "Logging in..."
                    : "Login"}
                </span>
              </button>
            </form>

            <p className={styles.helpText}>
              Don't have your Student ID or password?
              <br />
              Please contact your teacher or school
              administrator.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
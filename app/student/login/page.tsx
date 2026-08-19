"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaUserGraduate,
  FaShieldAlt,
  FaKey,
  FaGraduationCap,
} from "react-icons/fa";

import styles from "./login.module.css";

export default function StudentLoginPage() {
  const router = useRouter();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    // Validate Student ID
    if (!studentId.trim()) {
      setError("Please enter your Student ID.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/student/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          studentId: studentId.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Invalid Student ID or password."
        );
        return;
      }

      setSuccessMessage("Login successful!");

      setTimeout(() => {
        router.push("/student/dashboard");
      }, 500);
    } catch (error) {
      console.error("Student login request failed:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          BACK BUTTON
          ===================================================== */}

      <Link href="/" className={styles.backButton}>
        <FaArrowLeft />
        <span>Back</span>
      </Link>

      {/* =====================================================
          LOGIN CARD
          ===================================================== */}

      <section className={styles.loginCard}>

        {/* ===================================================
            LEFT INFORMATION PANEL
            =================================================== */}

        <aside className={styles.informationPanel}>

          {/* LOGO */}

          <div className={styles.logoSection}>
            <img
              src="/nois_logo.png"
              alt="NOIS logo"
              className={styles.logoImage}
            />
          </div>

          {/* INFORMATION */}

          <div className={styles.informationContent}>

            <h1>
              Welcome
              <br />

              <span className={styles.exceptionalText}>
                Student.
              </span>
            </h1>

            <div className={styles.headingLine} />

            <p className={styles.introduction}>
              Access your classes, learning activities,
              achievements and progress from one place.
            </p>

            {/* FEATURES */}

            <div className={styles.featureList}>

              {/* FEATURE 1 */}

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaUserGraduate />
                </span>

                <span>
                  Your Learning Dashboard
                </span>
              </div>

              {/* FEATURE 2 */}

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaGraduationCap />
                </span>

                <span>
                  Track Your Progress
                </span>
              </div>

              {/* FEATURE 3 */}

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaKey />
                </span>

                <span>
                  Secure Student Access
                </span>
              </div>

            </div>
          </div>

                            <img
          src="/school-campus.jpg"
          alt="School campus"
          className={styles.schoolImage}
        />


          {/* DECORATIVE CIRCLES */}

          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />


        </aside>

        {/* ===================================================
            RIGHT FORM PANEL
            =================================================== */}

        <section className={styles.formPanel}>

          <div className={styles.formContainer}>

            {/* FORM HEADING */}

            <div className={styles.formHeading}>

              {/* Mobile icon */}

              <span className={styles.mobileLogo}>
                <FaUserGraduate />
              </span>

              <div>
                <h2>
                  Student Login
                </h2>

                <p>
                  Enter your student credentials to continue.
                </p>
              </div>

            </div>

            {/* =================================================
                ERROR MESSAGE
                ================================================= */}

            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* =================================================
                SUCCESS MESSAGE
                ================================================= */}

            {successMessage && (
              <div className={styles.successMessage}>
                {successMessage}
              </div>
            )}

            {/* =================================================
                LOGIN FORM
                ================================================= */}

            <form
              onSubmit={handleSubmit}
              className={styles.loginForm}
            >

              {/* =================================================
                  STUDENT ID
                  ================================================= */}

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

              {/* =================================================
                  PASSWORD
                  ================================================= */}

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

              {/* =================================================
                  LOGIN BUTTON
                  ================================================= */}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
              >

                <FaShieldAlt />

                <span>
                  {isSubmitting
                    ? "Logging in..."
                    : "Login"}
                </span>

              </button>

            </form>

            {/* =================================================
                BOTTOM TEXT
                ================================================= */}

            <p className={styles.registerText}>
              Don't have a Student ID or password?
              <br />

              Please contact your teacher or school administrator.
            </p>

          </div>

        </section>

      </section>
    </main>
  );
}
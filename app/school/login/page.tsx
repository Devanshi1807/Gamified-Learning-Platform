"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaSchool,
  FaShieldAlt,
  FaKey,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import styles from "./login.module.css";

export default function SchoolLoginPage() {
  const router = useRouter();

  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
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
      {/* BACK BUTTON */}
      <Link href="/" className={styles.backButton}>
        <FaArrowLeft />
        <span>Back</span>
      </Link>

      <section className={styles.loginCard}>
        {/* =====================================================
            LEFT INFORMATION PANEL
        ====================================================== */}
        <aside className={styles.informationPanel}>
          <div className={styles.leftContent}>
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
                <span className={styles.exceptionalText}>Back.</span>
              </h1>

              <div className={styles.headingLine} />

              <p className={styles.introduction}>
                Manage your school, teachers, students and learning
                activities from one unified platform.
              </p>

              {/* FEATURES */}
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
                    <FaUsers />
                  </span>

                  <span>Manage Your School</span>
                </div>
              </div>
            </div>
          </div>

          {/* DECORATIVE CIRCLES */}
          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />

          {/* SCHOOL IMAGE */}
          <div className={styles.schoolImageWrapper}>
            <img
              src="/school-campus.jpg"
              alt="School campus"
              className={styles.schoolImage}
            />
          </div>
        </aside>

        {/* =====================================================
            RIGHT FORM PANEL
        ====================================================== */}
        <section className={styles.formPanel}>
          <div className={styles.formContainer}>
            {/* FORM HEADING */}
            <div className={styles.formHeading}>
              <span className={styles.mobileLogo}>
                <FaSchool />
              </span>

              <div>
                <h2>School Login</h2>

                <p>
                  Enter your school credentials to continue.
                </p>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {successMessage && (
              <div className={styles.successMessage}>
                {successMessage}
              </div>
            )}

            {/* LOGIN FORM */}
            <form
              onSubmit={handleSubmit}
              className={styles.loginForm}
            >
              {/* SCHOOL ID */}
              <div className={styles.formGroup}>
                <label htmlFor="schoolId">
                  School ID
                </label>

                <div className={styles.inputWrapper}>
                  <FaSchool />

                  <input
                    id="schoolId"
                    type="text"
                    placeholder="Enter your school ID"
                    value={schoolId}
                    onChange={(event) =>
                      setSchoolId(event.target.value)
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* LOGIN BUTTON */}
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

            {/* REGISTER */}
            <p className={styles.registerText}>
              Don't have a school account?{" "}
              <Link href="/school/register">
                Register your school
              </Link>
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}
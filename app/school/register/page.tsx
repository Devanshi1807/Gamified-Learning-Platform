"use client";
import { signIn } from "next-auth/react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./register.module.css";
import { Playfair_Display } from "next/font/google";
import { Baloo_2 } from "next/font/google";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartBar,
  FaClipboardCheck,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGraduationCap,
  FaLock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSchool,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const exceptionalFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
});
const bubblyFont = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

interface SchoolFormData {
  schoolName: string;
  principalName: string;
  schoolEmail: string;
  contactNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const initialFormData: SchoolFormData = {
  schoolName: "",
  principalName: "",
  schoolEmail: "",
  contactNumber: "",
  address: "",
  password: "",
  confirmPassword: "",
};

export default function SchoolRegisterPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<SchoolFormData>(initialFormData);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [googleMessage, setGoogleMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
    setGoogleMessage("");
  };

  const generateSchoolId = () => {
    const schoolCode = formData.schoolName
      .replace(/[^a-zA-Z]/g, "")
      .slice(0, 3)
      .toUpperCase()
      .padEnd(3, "X");

    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    return `NOIS-${schoolCode}-${randomNumber}`;
  };

  const validateForm = () => {
    if (
      !formData.schoolName.trim() ||
      !formData.principalName.trim() ||
      !formData.schoolEmail.trim() ||
      !formData.contactNumber.trim() ||
      !formData.address.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return "Please complete all the required fields.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.schoolEmail)) {
      return "Please enter a valid school email address.";
    }

    const phoneNumber = formData.contactNumber.replace(/\D/g, "");

    if (phoneNumber.length < 10) {
      return "Please enter a valid contact number.";
    }

    if (formData.password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Password and confirm password do not match.";
    }

    if (!acceptedTerms) {
      return "Please accept the Terms & Conditions and Privacy Policy.";
    }

    return "";
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    const schoolId = generateSchoolId();

    const schoolRecord = {
      schoolId,
      schoolName: formData.schoolName.trim(),
      principalName: formData.principalName.trim(),
      schoolEmail: formData.schoolEmail.trim(),
      contactNumber: formData.contactNumber.trim(),
      address: formData.address.trim(),
      createdAt: new Date().toISOString(),
    };

    /*
      This stores the school temporarily in the browser.

      Later, replace this with an API request to your database.
      Never store passwords in localStorage.
    */
    localStorage.setItem(
      "noisRegisteredSchool",
      JSON.stringify(schoolRecord)
    );

    localStorage.setItem("noisSchoolId", schoolId);

    setSuccessMessage(
      `School registered successfully. Your School ID is ${schoolId}`
    );

    window.setTimeout(() => {
      router.push("/school/dashboard");
    }, 1800);
  };

const handleGoogleRegistration = async () => {
  setError("");
  setGoogleMessage("");

  await signIn("google", {
    redirectTo: "/school/dashboard",
  });
};

  return (
    <main className={`${styles.page} ${poppins.className}`}>
      <Link href="/" className={styles.backButton}>
        <FaArrowLeft />
        <span>Back</span>
      </Link>

      <section className={styles.registerCard}>
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
  Where Great
  <br />
  Schools Become

  <span
    className={`${styles.exceptionalText} ${bubblyFont.className}`}
  >
    Exceptional.
  </span>
</h1>

            <div className={styles.headingLine} />

            <p className={styles.introduction}>
              Manage students, teachers, attendance, exams and more
              from one unified platform.
            </p>

            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaGraduationCap />
                </span>
                <span>Student Management</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaUsers />
                </span>
                <span>Teacher Management</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaClipboardCheck />
                </span>
                <span>Attendance Tracking</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaCalendarAlt />
                </span>
                <span>Timetable Management</span>
              </div>

              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <FaChartBar />
                </span>
                <span>Powerful Analytics</span>
              </div>
            </div>
          </div>

          <div className={styles.cloudOne} />
          <div className={styles.cloudTwo} />

          <img
            src="/school-campus.png"
            alt=" school campus"
            className={styles.schoolImage}
          />
        </aside>

        <section className={styles.formPanel}>
          <div className={styles.formContainer}>
            <div className={styles.formHeading}>
              <span className={styles.mobileLogo}>
                <FaSchool />
              </span>

              <div>
                <h2>Register Your School</h2>
                <p>
                  Create your school account and start your digital
                  journey with NOIS.
                </p>
              </div>
            </div>

            {error && (
              <div className={styles.errorMessage}>{error}</div>
            )}

            {successMessage && (
              <div className={styles.successMessage}>
                {successMessage}
              </div>
            )}

            {googleMessage && (
              <div className={styles.infoMessage}>
                {googleMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="schoolName">School Name</label>

                  <div className={styles.inputWrapper}>
                    <FaSchool />

                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      placeholder="Enter school name"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      autoComplete="organization"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="principalName">
                    Principal Name
                  </label>

                  <div className={styles.inputWrapper}>
                    <FaUserTie />

                    <input
                      id="principalName"
                      name="principalName"
                      type="text"
                      placeholder="Enter principal name"
                      value={formData.principalName}
                      onChange={handleInputChange}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="schoolEmail">School Email</label>

                  <div className={styles.inputWrapper}>
                    <FaEnvelope />

                    <input
                      id="schoolEmail"
                      name="schoolEmail"
                      type="email"
                      placeholder="Enter school email"
                      value={formData.schoolEmail}
                      onChange={handleInputChange}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contactNumber">
                    Contact Number
                  </label>

                  <div className={styles.inputWrapper}>
                    <FaPhoneAlt />

                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      placeholder="Enter contact number"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div
                  className={`${styles.formGroup} ${styles.fullWidth}`}
                >
                  <label htmlFor="address">Address</label>

                  <div
                    className={`${styles.inputWrapper} ${styles.textareaWrapper}`}
                  >
                    <FaMapMarkerAlt />

                    <textarea
                      id="address"
                      name="address"
                      placeholder="Enter school address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      autoComplete="street-address"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>

                  <div className={styles.inputWrapper}>
                    <FaLock />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className={styles.passwordButton}
                      onClick={() =>
                        setShowPassword((current) => !current)
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

                <div className={styles.formGroup}>
                  <label htmlFor="confirmPassword">
                    Confirm Password
                  </label>

                  <div className={styles.inputWrapper}>
                    <FaLock />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      autoComplete="new-password"
                    />

                    <button
                      type="button"
                      className={styles.passwordButton}
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <label className={styles.termsRow}>
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => {
                    setAcceptedTerms(event.target.checked);
                    setError("");
                  }}
                />

                <span className={styles.customCheckbox}>
                  {acceptedTerms ? "✓" : ""}
                </span>

                <span>
                  I agree to the{" "}
                  <Link href="/terms">Terms &amp; Conditions</Link>{" "}
                  and <Link href="/privacy">Privacy Policy</Link>
                </span>
              </label>

              <button
                type="submit"
                className={styles.registerButton}
                disabled={isSubmitting}
              >
                <FaSchool />

                <span>
                  {isSubmitting
                    ? "Creating school account..."
                    : "Register School"}
                </span>
              </button>

              <div className={styles.divider}>
                <span />
                <p>OR</p>
                <span />
              </div>

              <button
                type="button"
                className={styles.googleButton}
                onClick={handleGoogleRegistration}
              >
                <FaGoogle />
                <span>Register with Google</span>
              </button>

              <p className={styles.loginText}>
                Already have an account?{" "}
                <Link href="/school/login">Login here</Link>
              </p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
<div className={styles.campusImageContainer}>
  <img
    src="/school-campus.jpg"
    alt=""
    className={styles.campusImage}
  />
</div>

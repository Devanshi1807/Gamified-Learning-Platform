"use client";

import { useEffect, useState } from "react";
import styles from "./MiniCalendar.module.css";

type MiniCalendarProps = {
  onDateChange?: (date: Date) => void;
};

export default function MiniCalendar({
  onDateChange,
}: MiniCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onDateChange?.(selectedDate);
  }, [selectedDate, onDateChange]);

  const monthName = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const isSameDate = (day: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const goPreviousMonth = () => {
    setCurrentMonth(
      new Date(year, month - 1, 1)
    );
  };

  const goNextMonth = () => {
    setCurrentMonth(
      new Date(year, month + 1, 1)
    );
  };

  const goToday = () => {
    const today = new Date();

    setSelectedDate(today);
    setCurrentMonth(today);
    setOpen(false);
  };

  const selectDate = (day: number) => {
    const newDate = new Date(year, month, day);

    setSelectedDate(newDate);
    setOpen(false);
  };

  const formattedDate = selectedDate.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const weekday = selectedDate.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
    }
  );

  return (
    <div className={styles.miniCalendarWrapper}>

      {/* SMALL DATE CARD */}
      <button
        type="button"
        className={styles.miniDateCard}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="miniCalendarIcon">
          ▣
        </div>

        <div className="miniDateText">
          <strong>{formattedDate}</strong>
          <span>{weekday}</span>
        </div>

        <span className="miniArrow">
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      {/* CALENDAR POPUP */}
      {open && (
        <div className="miniCalendarPopup">

          <div className="miniCalendarHeader">

            <button
              type="button"
              onClick={goPreviousMonth}
              className="monthButton"
            >
              ‹
            </button>

            <strong>{monthName}</strong>

            <button
              type="button"
              onClick={goNextMonth}
              className="monthButton"
            >
              ›
            </button>

          </div>
          <div className={styles.weekDays}>
  <span>Sun</span>
  <span>Mon</span>
  <span>Tue</span>
  <span>Wed</span>
  <span>Thu</span>
  <span>Fri</span>
  <span>Sat</span>
</div>

<div className={styles.calendarDays}>
  {days.map((day, index) => (
    <button
      key={index}
      type="button"
      disabled={day === null}
      className={
        day !== null && isSameDate(day)
          ? `${styles.calendarDay} ${styles.selectedDay}`
          : styles.calendarDay
      }
      onClick={() => {
        if (day !== null) {
          selectDate(day);
        }
      }}
    >
      {day}
    </button>
  ))}
</div>

          

          <button
            type="button"
            className="todayButton"
            onClick={goToday}
          >
            Today
          </button>

        </div>
      )}
    </div>
  );
}

import WorkspaceCard from "./WorkspaceCard";
import styles from "./WorkspaceGrid.module.css";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaSchool,
} from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";

export default function WorkspaceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <WorkspaceCard
        number="01"
        title="Student Login"
        description="Access your courses, quizzes and gamified learning."
        color="#7C3AED"
        Icon={FaUserGraduate}
        href="/student/login"
      />

      <WorkspaceCard
        number="02"
        title="Teacher Login"
        description="Manage timetable, attendance and classroom activities."
        color="#10B981"
        Icon={FaChalkboardTeacher}
        href="/teacher/login"
      />

      <WorkspaceCard
        number="03"
        title="School Register"
        description="Register your institution and begin your digital journey."
        color="#F59E0B"
        Icon={MdAppRegistration}
        href="/school/register"
      />

      <WorkspaceCard
        number="04"
        title="School Login"
        description="Manage teachers, students and school administration."
        color="#2563EB"
        Icon={FaSchool}
        href="/school/login"
      />
    </div>
  );
}



import WorkspaceCard from "./WorkspaceCard";
import { FaUserGraduate, FaSchool } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";

export default function WorkspaceGrid() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-6 md:grid-cols-3 lg:gap-6 xl:gap-8">
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
        title="School Register"
        description="Register your institution and begin your digital journey."
        color="#F59E0B"
        Icon={MdAppRegistration}
        href="/school/register"
      />

      <WorkspaceCard
        number="03"
        title="School Login"
        description="Manage teachers, students and school administration."
        color="#2563EB"
        Icon={FaSchool}
        href="/school/login"
      />
    </div>
  );
}
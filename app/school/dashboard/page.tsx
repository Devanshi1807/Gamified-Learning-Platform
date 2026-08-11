import { redirect } from "next/navigation";
import { getAuthenticatedSchool } from "@/lib/auth";
import LogoutButton from "@/components/school/LogoutButton";

export default async function SchoolDashboardPage() {
  const school = await getAuthenticatedSchool();

  if (!school) {
    redirect("/school/login");
  }

  return (
    <main>
      <h1>Welcome, {school.school_name}</h1>

      <p>School ID: {school.school_id}</p>
      <p>Principal: {school.principal_name}</p>
      <p>Email: {school.school_email}</p>

      <LogoutButton />
    </main>
  );
}

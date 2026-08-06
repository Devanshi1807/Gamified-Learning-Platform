"use client";

import StudentLeftPanel from "@/components/student-login/StudentLeftPanel";
import StudentLoginCard from "@/components/student-login/StudentLoginCard";

export default function StudentLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 py-8 px-4">

      {/* Back Button */}

      <div className="max-w-7xl mx-auto mb-6">
        <button
          onClick={() => history.back()}
          className="bg-white px-6 py-3 rounded-xl shadow hover:shadow-lg transition font-semibold text-blue-600"
        >
          ← Back
        </button>
      </div>

      {/* Main Card */}

      <div className="max-w-7xl mx-auto bg-white rounded-[36px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Panel */}

        <StudentLeftPanel />

        {/* Right Panel */}

        <StudentLoginCard />

      </div>

    </main>
  );
}
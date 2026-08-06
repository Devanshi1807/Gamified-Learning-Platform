import Image from "next/image";
import {
  Trophy,
  Gamepad2,
  BookOpen,
  Target,
  BarChart3,
} from "lucide-react";

export default function StudentLeftPanel() {
  const features = [
    {
      icon: <Gamepad2 className="w-5 h-5 text-blue-600" />,
      title: "Gamified Learning",
    },
    {
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      title: "Interactive Lessons",
    },
    {
      icon: <Target className="w-5 h-5 text-blue-600" />,
      title: "Daily Challenges",
    },
    {
      icon: <Trophy className="w-5 h-5 text-blue-600" />,
      title: "XP, Coins & Badges",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />,
      title: "Track Your Progress",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-12 flex flex-col justify-between overflow-hidden">

      {/* Decorative Circles */}

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl" />

      <div className="relative z-10">

        {/* Logo */}

        <div className="mb-10">

          <Image
            src="/nois_logo.png"
            alt="NOIS Logo"
            width={220}
            height={80}
            priority
          />

        </div>

        {/* Heading */}

        <h1 className="text-6xl font-bold leading-tight text-slate-900">

          Continue Your

          <br />

          Learning

          <br />

          <span className="text-blue-600">
            Journey
          </span>

        </h1>

        {/* Line */}

        <div className="w-20 h-1 bg-blue-600 rounded-full my-8" />

        {/* Description */}

        <p className="text-slate-600 text-lg leading-8 max-w-md">

          Login with your school credentials and continue your exciting
          learning adventure. Solve challenges, earn XP, unlock badges
          and climb the leaderboard.

        </p>

        {/* Feature List */}

        <div className="mt-10 space-y-5">

          {features.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-xl shadow-sm px-5 py-4"
            >

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                {item.icon}

              </div>

              <h3 className="font-semibold text-slate-800">

                {item.title}

              </h3>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Illustration */}

      <div className="relative z-10 mt-12">

        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg">

          <h3 className="font-bold text-xl text-slate-800 mb-2">

            Ready to Level Up?

          </h3>

          <p className="text-slate-600 leading-7">

            Every lesson completed earns XP.
            Every challenge solved unlocks achievements.
            Keep your streak alive and become the class champion!

          </p>

        </div>

      </div>

    </div>
  );
}
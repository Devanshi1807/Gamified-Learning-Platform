"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./topic.module.css";

const topics: Record<
  string,
  {
    icon: string;
    title: string;
    intro: string;
    story: {
      character: string;
      situation: string;
      question: string;
      choices: string[];
      correctIndex: number;
      explanations: string[];
      insight: string;
    };
    points: string[];
    tips: string[];
  }
> = {
  "healthy-eating": {
    icon: "🥗",
    title: "Healthy Eating & Nutrition",
    intro:
      "Let's explore how everyday food choices affect your energy, concentration and overall well-being.",

    story: {
      character: "Meet Aarav 👋",
      situation:
        "Aarav has an important school presentation tomorrow. At lunch, he chooses a packet of chips and a sugary drink because they are quick and tasty. Two hours later, he feels hungry again and finds it difficult to concentrate.",

      question:
        "If you were Aarav's friend, what would you suggest for his next meal?",

      choices: [
        "Another packet of chips because it is quick.",
        "A balanced meal with vegetables, grains and a protein source.",
        "Skip the meal and eat later.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Chips can be enjoyed occasionally, but relying on them as a meal does not provide the variety of nutrients the body needs.",
        "Correct! A balanced meal can provide a combination of nutrients that supports energy, growth and concentration.",
        "Not quite. Skipping meals does not solve the problem. A balanced meal gives the body useful nutrients and energy.",
      ],

      insight:
        "A balanced meal gives the body a combination of nutrients that can support energy and concentration. This does not mean you can never enjoy snacks — balance is the key.",
    },

    points: [
      "Our bodies need a variety of nutrients to grow and stay active.",
      "Fruits and vegetables provide important vitamins, minerals and fibre.",
      "Protein helps support growth and repair.",
      "Water is important for normal body functions.",
    ],

    tips: [
      "Try to include different colours of fruits and vegetables.",
      "Choose water regularly throughout the day.",
      "Don't let snacks regularly replace balanced meals.",
    ],
  },

  "junk-food": {
    icon: "🍔",
    title: "Junk Food & Its Effects",
    intro:
      "Let's understand why some foods are fine occasionally but may become a problem when they dominate our everyday diet.",

    story: {
      character: "A Small Choice 🍔",
      situation:
        "Riya gets home from school feeling hungry. She has two choices: a packet of chips and a soft drink, or a homemade snack with fruit and water. She chooses the chips because they taste great. Soon, this becomes her everyday after-school routine.",

      question:
        "What could happen if Riya's everyday diet contained mostly highly processed snacks?",

      choices: [
        "She would automatically become healthier.",
        "She might miss out on important nutrients.",
        "Nothing about her diet would matter.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Eating mostly highly processed snacks does not automatically make a diet healthier.",
        "Correct! If highly processed snacks replace nutritious foods too often, Riya may miss important nutrients her body needs.",
        "Not quite. Everyday food choices can affect whether someone gets enough essential nutrients.",
      ],

      insight:
        "Highly processed foods can be high in added sugar, salt or unhealthy fats while providing fewer essential nutrients. The goal is balance, not banning individual foods.",
    },

    points: [
      "Too much highly processed food can make a balanced diet harder to maintain.",
      "Sugary drinks can contribute significant amounts of added sugar.",
      "Nutritious foods should form an important part of everyday meals.",
      "Occasional treats can fit into an overall balanced lifestyle.",
    ],

    tips: [
      "Keep nutritious snacks available at home.",
      "Choose water more often than sugary drinks.",
      "Check nutrition labels when comparing packaged foods.",
    ],
  },

  "physical-fitness": {
    icon: "🏃",
    title: "Physical Fitness",
    intro:
      "Your body is designed to move. Let's see how small choices during a normal school day can add up.",

    story: {
      character: "The 10-Minute Challenge 🏃",
      situation:
        "Kabir spends most of his evening studying and playing games on his computer. He rarely takes breaks. One afternoon, his friend challenges him to spend just 10 minutes walking, stretching or playing outside between study sessions.",

      question:
        "Which approach would be more sustainable for Kabir?",

      choices: [
        "Exercise extremely hard once a month.",
        "Build regular movement into his daily routine.",
        "Avoid physical activity during school days.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Very occasional intense exercise is not the same as maintaining regular physical activity.",
        "Correct! Building regular movement into everyday life is a more sustainable approach to staying active.",
        "Not quite. Avoiding physical activity removes an important part of a healthy lifestyle.",
      ],

      insight:
        "Regular movement is generally more useful than occasional extreme effort. Walking, cycling, sports, dancing and outdoor games can all contribute to physical activity.",
    },

    points: [
      "Physical fitness includes endurance, strength and flexibility.",
      "Regular movement supports overall health.",
      "Sports and outdoor games can make physical activity enjoyable.",
      "Short active breaks can help break up long periods of sitting.",
    ],

    tips: [
      "Choose activities you actually enjoy.",
      "Take active breaks during long study sessions.",
      "Try walking, cycling, dancing or playing a sport.",
    ],
  },

  "mental-health": {
    icon: "🧠",
    title: "Mental Health",
    intro:
      "Everyone experiences difficult emotions sometimes. Let's look at how we can recognise them and respond in healthy ways.",

    story: {
      character: "The Night Before the Test 📚",
      situation:
        "It's Sunday evening. Aarav has a mathematics test on Monday. He has studied, but he keeps thinking, 'What if I forget everything?' His heart feels a little faster and he keeps checking the clock instead of studying.",

      question:
        "What would be the healthiest next step for Aarav?",

      choices: [
        "Keep worrying without taking a break.",
        "Take a short break, organise his work and talk to someone if he needs support.",
        "Stay awake all night studying.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Continuing to worry without taking any action may make the situation feel even more overwhelming.",
        "Correct! A short break, organising the remaining work and talking to someone trusted can be healthy ways to handle stress.",
        "Not quite. Losing sleep can make it harder to concentrate and cope with the next day's challenges.",
      ],

      insight:
        "Feeling worried before something important is normal. Healthy coping can include taking breaks, organising tasks, getting enough sleep and talking to someone you trust.",
    },

    points: [
      "Mental health is an important part of overall well-being.",
      "Everyone experiences emotions such as happiness, sadness, anger and worry.",
      "Talking to someone you trust can help when you're struggling.",
      "Asking for help is a healthy way of taking care of yourself.",
    ],

    tips: [
      "Break large tasks into smaller steps.",
      "Take short breaks when you feel overwhelmed.",
      "Make time for hobbies, friends and activities you enjoy.",
      "Talk to a trusted adult when something feels difficult to handle alone.",
    ],
  },

  "diseases-prevention": {
    icon: "🩺",
    title: "Common Diseases & Prevention",
    intro:
      "Many everyday health problems can be reduced through simple habits and responsible choices.",

    story: {
      character: "The School Picnic 🚌",
      situation:
        "Before a school picnic, Meera notices that one of her classmates has a cold. Everyone will be sharing spaces, food and activities throughout the day.",

      question:
        "Which behaviour is the most responsible?",

      choices: [
        "Share bottles and utensils with everyone.",
        "Maintain good hygiene and avoid unnecessary sharing of personal items.",
        "Ignore symptoms completely.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Sharing personal items can make it easier for some infections to spread.",
        "Correct! Good hygiene and avoiding unnecessary sharing of personal items can help reduce the spread of infections.",
        "Not quite. Ignoring illness completely is not a responsible approach to health.",
      ],

      insight:
        "Good hygiene practices can help reduce the spread of many infections. Vaccination, safe food and water practices and appropriate medical care are also important.",
    },

    points: [
      "Handwashing can help reduce the spread of many infections.",
      "Safe food and clean drinking water are important for health.",
      "Vaccination helps protect against several serious infectious diseases.",
      "Persistent or serious symptoms should be discussed with a qualified healthcare professional.",
    ],

    tips: [
      "Wash your hands before eating.",
      "Avoid sharing personal items when someone is ill.",
      "Follow recommended vaccination schedules.",
    ],
  },

  "personal-hygiene": {
    icon: "🧼",
    title: "Personal Hygiene",
    intro:
      "Small everyday habits can make a big difference to cleanliness and health.",

    story: {
      character: "Before School 🧼",
      situation:
        "It's Monday morning. Dev is running late for school. He considers skipping brushing his teeth and washing his hands before breakfast so he can leave two minutes earlier.",

      question:
        "Which habit should Dev prioritise?",

      choices: [
        "Skip all hygiene habits.",
        "Maintain essential hygiene even when he is in a hurry.",
        "Only practise hygiene on weekends.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Hygiene habits are important every day, not only when it is convenient.",
        "Correct! Essential hygiene habits should remain part of your everyday routine, even on busy mornings.",
        "Not quite. Hygiene needs to be practised consistently rather than only on weekends.",
      ],

      insight:
        "Personal hygiene is built through consistent everyday habits such as brushing teeth, washing hands, bathing regularly and keeping clothes and nails clean.",
    },

    points: [
      "Regular handwashing helps reduce the spread of germs.",
      "Brushing your teeth helps maintain oral hygiene.",
      "Regular bathing helps keep the body clean.",
      "Clean clothes and nails are part of everyday hygiene.",
    ],

    tips: [
      "Wash your hands with soap and water.",
      "Cover your mouth when coughing or sneezing.",
      "Keep personal hygiene items for your own use.",
    ],
  },

  "sleep-habits": {
    icon: "😴",
    title: "Sleep & Healthy Habits",
    intro:
      "Good sleep is not wasted time — it is part of preparing your mind and body for the next day.",

    story: {
      character: "The Late-Night Gamer 🎮",
      situation:
        "Arjun has an important class tomorrow but keeps playing games late into the night. His alarm rings in the morning and he feels tired, distracted and finds it harder to focus.",

      question:
        "Which change could help Arjun build a healthier routine?",

      choices: [
        "Sleep even later the next night.",
        "Create a consistent bedtime routine.",
        "Skip sleep before important school days.",
      ],

      correctIndex: 1,

      explanations: [
        "Not quite. Sleeping later would likely make the problem worse rather than improve his routine.",
        "Correct! A consistent bedtime routine can help make healthy sleep habits easier to maintain.",
        "Not quite. Sleep is important for physical and mental recovery and should not be deliberately skipped.",
      ],

      insight:
        "Sleep supports physical and mental recovery. A consistent sleep schedule and a calm routine before bedtime can make healthy sleep habits easier to maintain.",
    },

    points: [
      "Sleep is important for physical and mental recovery.",
      "A consistent sleep schedule can support healthy routines.",
      "A calm bedtime routine can make it easier to wind down.",
      "Sleep, nutrition, activity and relaxation all contribute to well-being.",
    ],

    tips: [
      "Try to maintain a regular bedtime.",
      "Create a relaxing routine before sleeping.",
      "Keep your sleeping environment comfortable and quiet.",
    ],
  },
};

export default function TopicPage() {
  const params = useParams();
  const topicId = params.topic as string;
  const topic = topics[topicId];

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  if (!topic) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <h1>Topic not found</h1>

          <Link href="/student/life-skills/health-wellness">
            ← Back to Health & Wellness
          </Link>
        </div>
      </main>
    );
  }

  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === topic.story.correctIndex;

  const handleAnswer = (index: number) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          href="/student/life-skills/health-wellness"
          className={styles.back}
        >
          ← Back to Health & Wellness
        </Link>

        {/* PERSONALIZED INTRO */}
        <section className={styles.personalizedBanner}>
          <div className={styles.aiBadge}>✨</div>

          <div className={styles.personalizedText}>
            <span>✨ PERSONALISED FOR YOU</span>

            <h2>
              Hi Akshat! Let&apos;s learn this through a real-life situation.
            </h2>

            <p>
              A short scenario has been prepared to help you connect the topic
              with everyday decisions.
            </p>
          </div>
        </section>

        {/* TOPIC HEADER */}
        <header className={styles.hero}>
          <div className={styles.icon}>{topic.icon}</div>

          <div>
            <span className={styles.eyebrow}>HEALTH & WELL-BEING</span>

            <h1>{topic.title}</h1>

            <p>{topic.intro}</p>
          </div>
        </header>

        {/* STORY CHALLENGE */}
        <section className={styles.storyCard}>
          <div className={styles.storyLabel}>
            🎮 TODAY&apos;S REAL-LIFE CHALLENGE
          </div>

          <h2>{topic.story.character}</h2>

          <p className={styles.storyText}>{topic.story.situation}</p>

          <div className={styles.questionBox}>
            <h3>{topic.story.question}</h3>

            <div className={styles.choices}>
              {topic.story.choices.map((choice, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectChoice =
                  index === topic.story.correctIndex;

                let choiceClass = styles.choice;

                if (answered && isCorrectChoice) {
                  choiceClass += ` ${styles.correctChoice}`;
                }

                if (answered && isSelected && !isCorrectChoice) {
                  choiceClass += ` ${styles.wrongChoice}`;
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    className={choiceClass}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                  >
                    <span className={styles.choiceLetter}>
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className={styles.choiceText}>{choice}</span>

                    {answered && isCorrectChoice && (
                      <span className={styles.choiceStatus}>✓</span>
                    )}

                    {answered && isSelected && !isCorrectChoice && (
                      <span className={styles.choiceStatus}>✕</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEEDBACK */}
          {answered && (
            <div
              className={`${styles.feedback} ${
                isCorrect ? styles.correctFeedback : styles.wrongFeedback
              }`}
            >
              <div className={styles.feedbackHeader}>
                <span className={styles.feedbackIcon}>
                  {isCorrect ? "✓" : "✕"}
                </span>

                <div>
                  <strong>
                    {isCorrect ? "Correct answer!" : "Not quite!"}
                  </strong>

                  <span>
                    {isCorrect
                      ? "+20 XP · Great thinking"
                      : "Every mistake is a chance to learn"}
                  </span>
                </div>
              </div>

              <p>
                {topic.story.explanations[selectedAnswer]}
              </p>

              {!isCorrect && (
                <div className={styles.correctAnswer}>
                  <strong>💡 Better choice:</strong>{" "}
                  {topic.story.choices[topic.story.correctIndex]}
                </div>
              )}
            </div>
          )}

          <div className={styles.insight}>
            <strong>💡 Learning Coach Insight</strong>

            <p>{topic.story.insight}</p>
          </div>
        </section>

        {/* KNOWLEDGE */}
        <div className={styles.contentGrid}>
          <section className={styles.card}>
            <h2>🧠 What You&apos;ll Discover</h2>

            <ul>
              {topic.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </section>

          <section className={styles.card}>
            <h2>⭐ Take This With You</h2>

            <ul>
              {topic.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* AI LEARNING COACH */}
        <section className={styles.aiCard}>
          <div className={styles.aiIcon}>✨</div>

          <div className={styles.aiContent}>
            <span>AI LEARNING COACH · COMING SOON</span>

            <h2>Ask AI about this topic</h2>

            <p>
              Soon, your AI tutor will understand your learning journey and
              explain topics in a way that works best for you.
            </p>
          </div>

          <button type="button" disabled>
            Ask AI →
          </button>
        </section>
      </div>
    </main>
  );
}
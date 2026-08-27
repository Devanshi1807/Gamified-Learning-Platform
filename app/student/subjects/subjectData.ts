export interface Module {
  id: number;
  name: string;
  description: string;
  status: "completed" | "in-progress" | "locked";
}

export interface Chapter {
  id: number;
  name: string;
  progress: number;
  modules: Module[];
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  chapters: Chapter[];
}

export const subjects: Subject[] = [
  {
    id: "english",
    name: "English",
    description:
      "Improve your language, grammar and communication skills.",

    chapters: [
      {
        id: 1,
        name: "The Best Christmas Present in the World",
        progress: 0,
        modules: [],
      },
      {
        id: 2,
        name: "The Tsunami",
        progress: 0,
        modules: [],
      },
      {
        id: 3,
        name: "Glimpses of the Past",
        progress: 0,
        modules: [],
      },
      {
        id: 4,
        name: "Bepin Choudhury's Lapse of Memory",
        progress: 0,
        modules: [],
      },
    ],
  },

  {
    id: "mathematics",
    name: "Mathematics",
    description:
      "Build strong mathematical concepts through interactive learning.",

    chapters: [
      {
        id: 1,
        name: "Rational Numbers",
        progress: 45,

        modules: [
          {
            id: 1,
            name: "Understanding Rational Numbers",
            description:
              "Learn the basics of rational numbers.",
            status: "completed",
          },
          {
            id: 2,
            name: "Number Line Challenge",
            description:
              "Place rational numbers correctly on the number line.",
            status: "in-progress",
          },
          {
            id: 3,
            name: "Compare and Order",
            description:
              "Challenge yourself to compare rational numbers.",
            status: "locked",
          },
          {
            id: 4,
            name: "Operations Challenge",
            description:
              "Practice operations with rational numbers.",
            status: "locked",
          },
        ],
      },

      {
        id: 2,
        name: "Linear Equations in One Variable",
        progress: 72,
        modules: [],
      },

      {
        id: 3,
        name: "Understanding Quadrilaterals",
        progress: 0,
        modules: [],
      },

      {
        id: 4,
        name: "Data Handling",
        progress: 0,
        modules: [],
      },

      {
        id: 5,
        name: "Squares and Square Roots",
        progress: 0,
        modules: [],
      },
    ],
  },

  {
    id: "science",
    name: "Science",
    description:
      "Explore the world of science through experiments and games.",

    chapters: [
      {
        id: 1,
        name: "Crop Production and Management",
        progress: 0,
        modules: [],
      },
      {
        id: 2,
        name: "Microorganisms",
        progress: 0,
        modules: [],
      },
      {
        id: 3,
        name: "Synthetic Fibres and Plastics",
        progress: 0,
        modules: [],
      },
      {
        id: 4,
        name: "Materials: Metals and Non-Metals",
        progress: 54,
        modules: [],
      },
    ],
  },
{
  id: "science",
  name: "Science",
  description:
    "Explore the wonderful world of science through curiosity, experiments and games.",

  chapters: [
    {
      id: 1,
      name: "The Wonderful World of Science",
      progress: 0,
      modules: [],
    },
    {
      id: 2,
      name: "Diversity in the Living World",
      progress: 0,
      modules: [],
    },
    {
      id: 3,
      name: "Mindful Eating: A Path to a Healthy Body",
      progress: 0,
      modules: [],
    },
    {
      id: 4,
      name: "Exploring Magnets",
      progress: 0,
      modules: [],
    },
    {
      id: 5,
      name: "Measurement of Length and Motion",
      progress: 0,
      modules: [],
    },
    {
      id: 6,
      name: "Materials Around Us",
      progress: 0,
      modules: [],
    },
    {
      id: 7,
      name: "Temperature and its Measurement",
      progress: 0,
      modules: [],
    },
    {
      id: 8,
      name: "A Journey through States of Water",
      progress: 0,
      modules: [],
    },
    {
      id: 9,
      name: "Methods of Separation in Everyday Life",
      progress: 0,
      modules: [],
    },
    {
      id: 10,
      name: "Living Creatures: Exploring their Characteristics",
      progress: 0,
      modules: [],
    },
    {
      id: 11,
      name: "Nature's Treasures",
      progress: 0,
      modules: [],
    },
    {
      id: 12,
      name: "Beyond Earth",
      progress: 0,
      modules: [],
    },
  ],
},
];
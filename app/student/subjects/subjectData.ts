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
    id: "social-science",
    name: "Social Science",
    description:
      "Discover history, geography, civics and the world around you.",

    chapters: [
      {
        id: 1,
        name: "How, When and Where",
        progress: 0,
        modules: [],
      },
      {
        id: 2,
        name: "From Trade to Territory",
        progress: 0,
        modules: [],
      },
      {
        id: 3,
        name: "Ruling the Countryside",
        progress: 0,
        modules: [],
      },
      {
        id: 4,
        name: "Tribals, Dikus and the Vision of a Golden Age",
        progress: 0,
        modules: [],
      },
    ],
  },
];
"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./constitution.module.css";

const comicPages = [
  {
    image: "/life-skills/constitution/panchayat-quest/page-1.png",
    title: "Meet the Panchayat System",
    description:
      "Discover the three levels of rural local government: Gram Panchayat, Panchayat Samiti and Zila Parishad.",
  },
  {
    image: "/life-skills/constitution/panchayat-quest/page-2.png",
    title: "Why Local Participation Matters",
    description:
      "See how Panchayats respond to local needs such as water, roads, sanitation, agriculture and education.",
  },
  {
    image: "/life-skills/constitution/panchayat-quest/page-3.png",
    title: "What Does a Panchayat Do?",
    description:
      "Explore practical development work and how local institutions connect government with everyday life.",
  },
  {
    image: "/life-skills/constitution/panchayat-quest/page-4.png",
    title: "Everyone Gets a Voice",
    description:
      "Learn about representation, women in local government and child-friendly participation through Bal Panchayat.",
  },
  {
    image: "/life-skills/constitution/panchayat-quest/page-5.png",
    title: "Panchayat Power-Up",
    description:
      "Finish with a quick revision map, key exam points and a final village problem-solving challenge.",
  },
];

export default function ConstitutionPage() {
  const [currentPage, setCurrentPage] = useState(0);

  const page = comicPages[currentPage];

  return (
    <main className={styles.page}>
      <Link href="/student/life-skills" className={styles.backLink}>
        ← Back to Explore Domains
      </Link>

      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>
            ⚖️ CONSTITUTION · BASIC LAWS · CIVIC SENSE
          </span>

          <h1>Learn Democracy Through Stories</h1>

          <p>
            Explore the Panchayati Raj system through an interactive comic
            journey about villages, local government and grassroots democracy.
          </p>
        </div>

        <div className={styles.heroIcon}>🏛️</div>
      </section>

      <section className={styles.comicHeader}>
        <div>
          <span className={styles.chapterTag}>📖 PANCHAYAT QUEST</span>

          <h2>{page.title}</h2>

          <p>{page.description}</p>
        </div>

        <div className={styles.counter}>
          <strong>{currentPage + 1}</strong>
          <span> / {comicPages.length}</span>
        </div>
      </section>

      <section className={styles.reader}>
        <button
          className={styles.navButton}
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ←
        </button>

        <div className={styles.comicFrame}>
          <img
            src={page.image}
            alt={`Panchayat Quest comic page ${currentPage + 1}`}
            className={styles.comicImage}
          />
        </div>

        <button
          className={styles.navButton}
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(comicPages.length - 1, p + 1)
            )
          }
          disabled={currentPage === comicPages.length - 1}
          aria-label="Next page"
        >
          →
        </button>
      </section>

      <section className={styles.thumbnailRow}>
        {comicPages.map((comic, index) => (
          <button
            key={comic.image}
            className={`${styles.thumbnail} ${
              index === currentPage ? styles.activeThumbnail : ""
            }`}
            onClick={() => setCurrentPage(index)}
          >
            <img
              src={comic.image}
              alt={`Comic page ${index + 1}`}
            />

            <span>Page {index + 1}</span>
          </button>
        ))}
      </section>

      <section className={styles.learningCard}>
        <div className={styles.learningIcon}>💡</div>

        <div>
          <span>LEARNING CHECK</span>

          <h3>What are you learning from this comic?</h3>

          <p>
            Panchayati Raj brings democracy closer to people&apos;s everyday
            lives. Try to remember the three levels of rural government and
            the kinds of local problems they help address.
          </p>
        </div>
      </section>

      <div className={styles.bottomControls}>
        <button
          className={styles.previousButton}
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
        >
          ← Previous
        </button>

        <div className={styles.dots}>
          {comicPages.map((_, index) => (
            <button
              key={index}
              aria-label={`Go to page ${index + 1}`}
              onClick={() => setCurrentPage(index)}
              className={`${styles.dot} ${
                index === currentPage ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>

        <button
          className={styles.nextButton}
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(comicPages.length - 1, p + 1)
            )
          }
          disabled={currentPage === comicPages.length - 1}
        >
          Next →
        </button>
      </div>
    </main>
  );
}
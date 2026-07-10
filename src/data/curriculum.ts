import type { Curriculum } from '../types';

// Year 1 follows the actual St. John's College freshman reading list
// (sjc.edu/academic-programs/undergraduate/great-books-reading-list),
// distributed across the freshman tracks: Seminar, Language (Ancient Greek),
// Mathematics, and Laboratory. Music begins sophomore year, so it is not a
// Year 1 track. Section divisions follow each work's own structure (books,
// plays, parts); Apology keeps its original section ids so saved progress
// carries over. Years 2–4 exist in the model but have no readings yet.
//
// BOOK ORDER IS THE READING ORDER. Seminar follows the Annapolis 2025–26
// freshman seminar schedule — see docs/seminar-reading-order.md for the
// full schedule and the mapping decisions (grouped plays, unscheduled
// reading-list works slotted at natural points).

export const curriculum: Curriculum = {
  years: [
    {
      id: 'year-1',
      label: 'Year 1',
      name: 'Freshman',
      tracks: [
        {
          id: 'y1-seminar',
          name: 'Seminar',
          intro:
            'The Greek year: the authors who first worked out the liberal arts, read roughly in the order they wrote. The order is for intelligibility, not history — each book is introduced, supported, or criticized by the others, and the questions are permanent.',
          books: [
            {
              id: 'homer-iliad',
              title: 'Iliad',
              author: 'Homer',
              context: {
                background:
                  'Composed in the 8th century BC out of a centuries-old oral tradition, the Iliad is the oldest book in the Program: a poem of the wrath of Achilles, honor, mortality, and what a human life is worth.',
                placement:
                  'The whole conversation starts here. The tragedians take their heroes from Homer, the historians measure war against him, and Plato — who calls him the educator of Greece — argues with him for the rest of the year.',
              },
              edition: 'In-app: Butler (public domain); in print: Lattimore (Chicago)',
              sections: [
                {
                  id: 'iliad-1',
                  title: 'Book I',
                  hasText: true,
                  hasQuestions: true,
                  meta: { estLength: '~25 min' },
                },
                { id: 'iliad-2', title: 'Book II', hasText: true, meta: { estLength: '~34 min' } },
                { id: 'iliad-3', title: 'Book III', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'iliad-4', title: 'Book IV', hasText: true, meta: { estLength: '~22 min' } },
                { id: 'iliad-5', title: 'Book V', hasText: true, meta: { estLength: '~37 min' } },
                { id: 'iliad-6', title: 'Book VI', hasText: true, meta: { estLength: '~22 min' } },
                { id: 'iliad-7', title: 'Book VII', hasText: true, meta: { estLength: '~19 min' } },
                { id: 'iliad-8', title: 'Book VIII', hasText: true, meta: { estLength: '~23 min' } },
                { id: 'iliad-9', title: 'Book IX', hasText: true, meta: { estLength: '~30 min' } },
                { id: 'iliad-10', title: 'Book X', hasText: true, meta: { estLength: '~24 min' } },
                { id: 'iliad-11', title: 'Book XI', hasText: true, meta: { estLength: '~37 min' } },
                { id: 'iliad-12', title: 'Book XII', hasText: true, meta: { estLength: '~21 min' } },
                { id: 'iliad-13', title: 'Book XIII', hasText: true, meta: { estLength: '~36 min' } },
                { id: 'iliad-14', title: 'Book XIV', hasText: true, meta: { estLength: '~23 min' } },
                { id: 'iliad-15', title: 'Book XV', hasText: true, meta: { estLength: '~32 min' } },
                { id: 'iliad-16', title: 'Book XVI', hasText: true, meta: { estLength: '~39 min' } },
                { id: 'iliad-17', title: 'Book XVII', hasText: true, meta: { estLength: '~32 min' } },
                { id: 'iliad-18', title: 'Book XVIII', hasText: true, meta: { estLength: '~26 min' } },
                { id: 'iliad-19', title: 'Book XIX', hasText: true, meta: { estLength: '~17 min' } },
                { id: 'iliad-20', title: 'Book XX', hasText: true, meta: { estLength: '~22 min' } },
                { id: 'iliad-21', title: 'Book XXI', hasText: true, meta: { estLength: '~27 min' } },
                { id: 'iliad-22', title: 'Book XXII', hasText: true, meta: { estLength: '~24 min' } },
                { id: 'iliad-23', title: 'Book XXIII', hasText: true, meta: { estLength: '~39 min' } },
                { id: 'iliad-24', title: 'Book XXIV', hasText: true, meta: { estLength: '~36 min' } },
              ],
            },
            {
              id: 'homer-odyssey',
              title: 'Odyssey',
              author: 'Homer',
              context: {
                background:
                  'Homer’s second epic turns from war to homecoming: Odysseus’ ten-year return from Troy, a poem of cunning, endurance, hospitality, and identity.',
                placement:
                  'Read directly after the Iliad as its counterpart — mind against strength, survival after the war. Its scenes of disguise and recognition return in the tragedies, and its underworld in the Phaedo.',
              },
              edition: 'In-app: Butler (public domain); in print: Lattimore (Harper)',
              commentary: [{ id: 'butler-prefaces', title: 'Butler’s Prefaces' }],
              sections: [
                { id: 'odyssey-1', title: 'Book I', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'odyssey-2', title: 'Book II', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'odyssey-3', title: 'Book III', hasText: true, meta: { estLength: '~20 min' } },
                { id: 'odyssey-4', title: 'Book IV', hasText: true, meta: { estLength: '~35 min' } },
                { id: 'odyssey-5', title: 'Book V', hasText: true, meta: { estLength: '~20 min' } },
                { id: 'odyssey-6', title: 'Book VI', hasText: true, meta: { estLength: '~15 min' } },
                { id: 'odyssey-7', title: 'Book VII', hasText: true, meta: { estLength: '~15 min' } },
                { id: 'odyssey-8', title: 'Book VIII', hasText: true, meta: { estLength: '~24 min' } },
                { id: 'odyssey-9', title: 'Book IX', hasText: true, meta: { estLength: '~25 min' } },
                { id: 'odyssey-10', title: 'Book X', hasText: true, meta: { estLength: '~25 min' } },
                { id: 'odyssey-11', title: 'Book XI', hasText: true, meta: { estLength: '~26 min' } },
                { id: 'odyssey-12', title: 'Book XII', hasText: true, meta: { estLength: '~20 min' } },
                { id: 'odyssey-13', title: 'Book XIII', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'odyssey-14', title: 'Book XIV', hasText: true, meta: { estLength: '~23 min' } },
                { id: 'odyssey-15', title: 'Book XV', hasText: true, meta: { estLength: '~24 min' } },
                { id: 'odyssey-16', title: 'Book XVI', hasText: true, meta: { estLength: '~20 min' } },
                { id: 'odyssey-17', title: 'Book XVII', hasText: true, meta: { estLength: '~25 min' } },
                { id: 'odyssey-18', title: 'Book XVIII', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'odyssey-19', title: 'Book XIX', hasText: true, meta: { estLength: '~26 min' } },
                { id: 'odyssey-20', title: 'Book XX', hasText: true, meta: { estLength: '~17 min' } },
                { id: 'odyssey-21', title: 'Book XXI', hasText: true, meta: { estLength: '~18 min' } },
                { id: 'odyssey-22', title: 'Book XXII', hasText: true, meta: { estLength: '~20 min' } },
                { id: 'odyssey-23', title: 'Book XXIII', hasText: true, meta: { estLength: '~16 min' } },
                { id: 'odyssey-24', title: 'Book XXIV', hasText: true, meta: { estLength: '~23 min' } },
              ],
            },
            {
              id: 'plato-meno',
              title: 'Meno',
              author: 'Plato',
              context: {
                background:
                  'A short, early Platonic dialogue that begins mid-question: can virtue be taught? Socrates’ cross-examination strips Meno of every confident answer and models inquiry that starts from admitted ignorance.',
                placement:
                  'The first philosophy of the year, placed right after Homer: the epics show human excellence lived; the Meno asks what it is and whether it can be taught. It is also the text freshmen translate in the Greek tutorial — seminar and language meet here.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'meno-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { cite: '70a–100b', estLength: '~1 hr' },
                },
              ],
            },
            {
              id: 'aeschylus-tragedies',
              title: 'Tragedies',
              author: 'Aeschylus',
              context: {
                background:
                  'Aeschylus (525–456 BC), the eldest of the three Athenian tragedians, fought at Marathon. The Oresteia — the only complete surviving trilogy — follows the house of Atreus from murder to trial; Prometheus Bound stages a Titan’s defiance of Zeus.',
                placement:
                  'Tragedy carries Homer’s world into the city: Agamemnon comes home from the very war the Iliad sang, and by the end of the Eumenides vengeance has been transformed into law. The trial scene prepares the year’s other great trial — Socrates’.',
              },
              sections: [
                { id: 'aeschylus-1', title: 'Agamemnon' },
                { id: 'aeschylus-2', title: 'Libation Bearers' },
                { id: 'aeschylus-3', title: 'Eumenides' },
                { id: 'aeschylus-4', title: 'Prometheus Bound' },
              ],
            },
            {
              id: 'plato-gorgias',
              title: 'Gorgias',
              author: 'Plato',
              context: {
                background:
                  'Plato’s confrontation with rhetoric: Socrates against a celebrated orator and his students, on whether persuasion without knowledge is a craft or flattery — and whether it is better to suffer wrong than to do it.',
                placement:
                  'After the Meno’s question about teaching virtue comes the men who claimed to teach it. The defense of philosophy against power rehearses the Apology, and Callicles’ case for the stronger returns as Athenian policy in Thucydides.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'gorgias-1',
                  title: 'Gorgias & Polus',
                  hasText: true,
                  meta: { cite: '447a–481b', estLength: '~1 hr' },
                },
                {
                  id: 'gorgias-2',
                  title: 'Callicles',
                  hasText: true,
                  meta: { cite: '481b–527e', estLength: '~1.5 hrs' },
                },
              ],
            },
            {
              id: 'plutarch-lives',
              title: 'Lives',
              author: 'Plutarch',
              context: {
                background:
                  'Plutarch (c. 46–120 AD) wrote paired lives of eminent Greeks and Romans centuries after the fact; Lycurgus and Solon portray the lawgivers of Sparta and Athens.',
                placement:
                  'A portrait of the two cities whose rivalry organizes the histories ahead: Lycurgus’ Sparta and Solon’s Athens are the regimes Herodotus and Thucydides presuppose, and the raw material for the Republic’s question of what founding a city means.',
              },
              sections: [
                { id: 'plutarch-1', title: 'Lycurgus' },
                { id: 'plutarch-2', title: 'Solon' },
              ],
            },
            {
              id: 'herodotus-histories',
              title: 'Histories',
              author: 'Herodotus',
              context: {
                background:
                  'Herodotus (c. 484–425 BC) called his work an inquiry — historia — into why Greeks and Persians fought, sweeping in the customs and stories of the whole known world on the way to Marathon, Thermopylae, and Salamis.',
                placement:
                  'The first prose in the year: after epic and tragedy, a new way of accounting for human deeds. His Athens at its height sets up Thucydides’ Athens at war, and his marvel at customs poses the question of nature versus convention that the sophists exploit.',
              },
              edition: 'Grene trans. (Chicago), or Landmark Herodotus',
              sections: [
                { id: 'herodotus-1', title: 'Books I–III' },
                { id: 'herodotus-2', title: 'Books IV–VI' },
                { id: 'herodotus-3', title: 'Books VII–IX' },
              ],
            },
            {
              id: 'plato-republic',
              title: 'Republic',
              author: 'Plato',
              context: {
                background:
                  'Plato’s central dialogue: beginning from the question what justice is, Socrates builds a city in speech — philosopher-kings, the divided line, the cave, and the critique of poetry at its heart.',
                placement:
                  'The center of the freshman year. It gathers everything so far: Homer’s heroes examined and expelled, the sophists answered, the lawgivers’ cities rebuilt in speech — and its account of knowledge frames what Euclid is doing in the mathematics tutorial.',
              },
              commentary: [
                { id: 'jowett-introduction', title: 'Jowett’s Introduction and Analysis' },
              ],
              sections: [
                { id: 'republic-1', title: 'Book I', hasText: true, meta: { estLength: '~55 min' } },
                { id: 'republic-2', title: 'Books II–IV', hasText: true, meta: { estLength: '~2.5 hrs' } },
                { id: 'republic-3', title: 'Books V–VII', hasText: true, meta: { estLength: '~2.5 hrs' } },
                { id: 'republic-4', title: 'Books VIII–X', hasText: true, meta: { estLength: '~2.5 hrs' } },
              ],
            },
            {
              id: 'aristophanes-clouds',
              title: 'Clouds',
              author: 'Aristophanes',
              context: {
                background:
                  'Aristophanes’ comedy of 423 BC installs a cartoon Socrates in a Thinkery, teaching the weaker argument to beat the stronger — a caricature the real Socrates lived with for a quarter century.',
                placement:
                  'Placed immediately before the Apology by design: at his trial Socrates names this play among the old slanders against him. It is the year’s reminder that Athens laughed at philosophy before it condemned it.',
              },
              sections: [{ id: 'clouds-1', title: 'The complete play' }],
            },
            {
              id: 'plato-apology',
              title: 'Apology',
              author: 'Plato',
              context: {
                background:
                  'Socrates’ speech at his trial in 399 BC, as Plato renders it: an account of the oracle, of a life spent examining the city, and of why he will not stop philosophizing — whatever the penalty.',
                placement:
                  'The hinge of the year. The Clouds’ caricature stands among the accusers being answered; the Gorgias’ claim that suffering wrong beats doing it is now tested with a life; and the verdict makes the Crito and Phaedo inevitable.',
              },
              edition: 'Grube trans. (Hackett), or Jowett (public domain)',
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'apology-1',
                  title: 'I. Socrates’ Defense Begins',
                  hasText: true,
                  meta: { cite: '17a–19a', estLength: '~4 min' },
                },
                {
                  id: 'apology-2',
                  title: 'II. The Old Accusers & the Oracle',
                  hasText: true,
                  meta: { cite: '19a–24b', estLength: '~10 min' },
                },
                {
                  id: 'apology-3',
                  title: 'III. The Charge of Corrupting the Young',
                  hasText: true,
                  meta: { cite: '24b–28a', estLength: '~8 min' },
                },
                {
                  id: 'apology-4',
                  title: 'IV. The Philosopher’s Station',
                  hasText: true,
                  meta: { cite: '28a–32e', estLength: '~10 min' },
                },
                {
                  id: 'apology-5',
                  title: 'V. Conclusion of the Defense',
                  hasText: true,
                  meta: { cite: '32e–35d', estLength: '~6 min' },
                },
                {
                  id: 'apology-6',
                  title: 'VI. The Verdict & the Counter-Penalty',
                  hasText: true,
                  meta: { cite: '35e–38b', estLength: '~5 min' },
                },
                {
                  id: 'apology-7',
                  title: 'VII. On the Fear of Death',
                  hasText: true,
                  meta: { cite: '38c–42a', estLength: '~7 min' },
                },
              ],
            },
            {
              id: 'plato-crito',
              title: 'Crito',
              author: 'Plato',
              context: {
                background:
                  'In prison awaiting execution, Socrates is offered escape by his old friend Crito — and refuses, giving voice to the Laws of Athens to explain why.',
                placement:
                  'The immediate sequel to the Apology: the man who defied the city’s threats in court now obeys its sentence. Holding those two stances together is the work of the dialogue.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'crito-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { cite: '43a–54e', estLength: '~25 min' },
                },
              ],
            },
            {
              id: 'plato-phaedo',
              title: 'Phaedo',
              author: 'Plato',
              context: {
                background:
                  'Socrates’ last day: a prison conversation on whether the soul survives death, ending in the hemlock and the most famous death scene in philosophy.',
                placement:
                  'Completes the trial trilogy. Its arguments lean on the Meno’s recollection, its calm answers the fear of death weighed in the Apology — and its underworld revisits Homer’s, transformed.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'phaedo-1',
                  title: 'Opening & first arguments',
                  hasText: true,
                  meta: { cite: '57a–84b', estLength: '~50 min' },
                },
                {
                  id: 'phaedo-2',
                  title: 'Final argument & death scene',
                  hasText: true,
                  meta: { cite: '84c–118a', estLength: '~1 hr' },
                },
              ],
            },
            {
              id: 'sophocles-tragedies',
              title: 'Tragedies',
              author: 'Sophocles',
              context: {
                background:
                  'Sophocles (c. 496–406 BC) spans nearly the whole Athenian century. The Theban plays — Oedipus’ discovery, his end at Colonus, Antigone’s defiance — with Philoctetes and Ajax, turn on knowledge, pollution, and the single person against the city.',
                placement:
                  'Read after Socrates’ trial: Oedipus’ drive to know at any cost and Antigone’s appeal beyond the city’s law replay the trial’s questions in tragic register. Ajax and Philoctetes return to Homer’s warriors, broken by the war’s aftermath.',
              },
              sections: [
                { id: 'sophocles-1', title: 'Oedipus Rex' },
                { id: 'sophocles-2', title: 'Oedipus at Colonus' },
                { id: 'sophocles-3', title: 'Antigone' },
                { id: 'sophocles-4', title: 'Philoctetes' },
                { id: 'sophocles-5', title: 'Ajax' },
              ],
            },
            {
              id: 'euripides-tragedies',
              title: 'Tragedies',
              author: 'Euripides',
              context: {
                background:
                  'Euripides (c. 480–406 BC), the youngest tragedian, staged the passions with unsettling directness; in Hippolytus and Bacchae a god destroys the man who denied him.',
                placement:
                  'The last tragedy of the year, read near Aristotle’s Poetics, which will analyze the form. The Bacchae — Dionysus against Pentheus — is the counterweight to the year’s confidence in reason, staged by the god of the theater himself.',
              },
              sections: [
                { id: 'euripides-1', title: 'Hippolytus' },
                { id: 'euripides-2', title: 'Bacchae' },
              ],
            },
            {
              id: 'plato-symposium',
              title: 'Symposium',
              author: 'Plato',
              context: {
                background:
                  'A banquet of speeches in praise of love — comic, medical, mythic — capped by Socrates’ report of Diotima’s ladder of eros and Alcibiades’ drunken portrait of Socrates himself.',
                placement:
                  'Plato at his most literary, competing with the poets on their own ground. Diotima’s ascent from beautiful bodies to beauty itself climbs the Republic’s cave by another route — desire rather than argument.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'symposium-1',
                  title: 'The first speeches',
                  hasText: true,
                  meta: { cite: '172a–197e', estLength: '~50 min' },
                },
                {
                  id: 'symposium-2',
                  title: 'Socrates & Alcibiades',
                  hasText: true,
                  meta: { cite: '198a–223d', estLength: '~50 min' },
                },
              ],
            },
            {
              id: 'thucydides-war',
              title: 'The History of the Peloponnesian War',
              author: 'Thucydides',
              context: {
                background:
                  'Thucydides (c. 460–400 BC), an Athenian general exiled from the war he chronicled, wrote it as a possession for all time: the plague, civil war at Corcyra, the Melian dialogue, the ruin of the Sicilian expedition.',
                placement:
                  'The dark sequel to Herodotus: the Greece that beat Persia consuming itself. This is the Athens that condemned Socrates, and at Melos the Gorgias’ justice of the stronger appears as policy rather than theory.',
              },
              edition: 'Landmark Thucydides (Strassler ed.)',
              sections: [
                { id: 'thucydides-1', title: 'Books I–II' },
                { id: 'thucydides-2', title: 'Books III–IV' },
                { id: 'thucydides-3', title: 'Books V–VI' },
                { id: 'thucydides-4', title: 'Books VII–VIII' },
              ],
            },
            {
              id: 'plato-parmenides',
              title: 'Parmenides',
              author: 'Plato',
              context: {
                background:
                  'Plato’s most difficult dialogue: the aged Parmenides examines the young Socrates’ theory of forms and finds it wanting, then leads a relentless dialectical exercise on the One.',
                placement:
                  'The turn into Plato’s late, self-critical period: the theory the Republic and Phaedo relied on is strained by its own author. It opens the sequence of late dialogues that closes the year’s Plato.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'parmenides-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { estLength: '~1.5 hrs' },
                },
              ],
            },
            {
              id: 'plato-theaetetus',
              title: 'Theaetetus',
              author: 'Plato',
              context: {
                background:
                  'What is knowledge? Three answers — perception, true opinion, true opinion with an account — are raised, examined, and fail, leaving the question standing and Socrates practicing his midwifery.',
                placement:
                  'Continues the late sequence: where the Republic asserted a divided line, the Theaetetus tests definitions of knowledge to honest failure — the Meno’s method, now aimed at knowing itself.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'theaetetus-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { estLength: '~2 hrs' },
                },
              ],
            },
            {
              id: 'plato-sophist',
              title: 'Sophist',
              author: 'Plato',
              context: {
                background:
                  'An Eleatic Stranger hunts the sophist through repeated division and is forced, against father Parmenides, to say that non-being somehow is.',
                placement:
                  'The dramatic sequel to the Theaetetus. The year’s old adversary — the sophist of the Gorgias — is finally cornered, by method rather than cross-examination.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'sophist-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { estLength: '~1.5 hrs' },
                },
              ],
            },
            {
              id: 'plato-timaeus',
              title: 'Timaeus',
              author: 'Plato',
              context: {
                background:
                  'Plato’s cosmology, offered as a likely story: a divine craftsman makes the world’s soul and body out of geometry — triangles, elements, the receptacle of becoming.',
                placement:
                  'Plato’s account of nature, read as the year turns toward Aristotle’s Physics and the laboratory’s questions — with the mathematics tutorial’s geometry built into the cosmos itself.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'timaeus-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { estLength: '~2.5 hrs' },
                },
              ],
            },
            {
              id: 'aristotle-ethics',
              title: 'Nicomachean Ethics',
              author: 'Aristotle',
              context: {
                background:
                  'Aristotle’s lectures on the human good: happiness as activity of soul in accordance with virtue, the mean, courage and justice, friendship, and the contemplative life.',
                placement:
                  'The year’s question — virtue, lived in Homer and interrogated in the Meno — receives Aristotle’s systematic answer. Where Plato dramatizes inquiry, Aristotle organizes it: the pair define two ways of doing philosophy.',
              },
              edition: 'Sachs trans. (Focus)',
              sections: [
                { id: 'ethics-1', title: 'Books I–III' },
                { id: 'ethics-2', title: 'Books IV–VI' },
                { id: 'ethics-3', title: 'Books VII–X' },
              ],
            },
            {
              id: 'aristotle-politics',
              title: 'Politics',
              author: 'Aristotle',
              context: {
                background:
                  'Man is by nature a political animal: Aristotle on the household, the regimes and their corruptions, citizenship, revolution, and education.',
                placement:
                  'The Republic’s city in speech meets a survey of cities in fact — including explicit criticism of Plato’s. Plutarch’s lawgivers and Thucydides’ regimes become material for analysis.',
              },
              sections: [
                { id: 'politics-1', title: 'Books I–IV' },
                { id: 'politics-2', title: 'Books V–VIII' },
              ],
            },
            {
              id: 'aristotle-poetics',
              title: 'Poetics',
              author: 'Aristotle',
              context: {
                background:
                  'Aristotle’s short treatise on tragedy: plot as its soul, reversal and recognition, and the catharsis of pity and fear.',
                placement:
                  'Read with the whole year’s tragedy in memory — Oedipus is its chief example — and as the counter-statement to the Republic’s expulsion of the poets: poetry defended by analysis.',
              },
              edition: 'Sachs trans. (Focus)',
              sections: [{ id: 'poetics-1', title: 'The complete treatise' }],
            },
            {
              id: 'aristotle-physics',
              title: 'Physics',
              author: 'Aristotle',
              context: {
                background:
                  'Aristotle’s inquiry into nature: matter and form, the four causes, chance, motion, place, time, and the unmoved mover.',
                placement:
                  'The vocabulary of natural science for the next two thousand years is coined here, against the Timaeus’ mythic cosmology. The laboratory’s moderns — Harvey, Lavoisier — write with and against precisely these concepts.',
              },
              edition: 'Sachs trans. (Rutgers)',
              sections: [
                { id: 'physics-1', title: 'Books I–IV' },
                { id: 'physics-2', title: 'Books V–VIII' },
              ],
            },
            {
              id: 'aristotle-metaphysics',
              title: 'Metaphysics',
              author: 'Aristotle',
              context: {
                background:
                  'All men by nature desire to know: Aristotle’s first philosophy — being as being, substance, actuality and potentiality, and the divine thought thinking itself.',
                placement:
                  'The most demanding book of the year, gathering the Physics’ causes and Plato’s forms (criticized by name) into the question underneath the whole Program: what is it for something to be?',
              },
              edition: 'Sachs trans. (Green Lion)',
              sections: [
                { id: 'metaphysics-1', title: 'Books I–VI' },
                { id: 'metaphysics-2', title: 'Books VII–XII' },
              ],
            },
            {
              id: 'aristotle-gencorr',
              title: 'On Generation and Corruption',
              author: 'Aristotle',
              context: {
                background:
                  'Aristotle on coming-to-be and passing-away: how the elements change into one another, and why generation is more than mere alteration.',
                placement:
                  'A bridge from seminar to laboratory: the question of element and change studied here returns, transformed, in Lavoisier’s chemistry and the atomists’ papers.',
              },
              sections: [{ id: 'gencorr-1', title: 'Selections' }],
            },
            {
              id: 'lucretius-nature',
              title: 'On the Nature of Things',
              author: 'Lucretius',
              context: {
                background:
                  'A Roman Epicurean poem of the 1st century BC in six books: the world explained by atoms and void, without providence, to free the reader from the fear of death and of the gods.',
                placement:
                  'The one Roman on the freshman list and the great ancient rival to Aristotle’s nature: materialism argued in epic verse. His atoms return with Dalton in the laboratory; his consolation answers the Phaedo’s.',
              },
              sections: [
                { id: 'lucretius-1', title: 'Books I–III' },
                { id: 'lucretius-2', title: 'Books IV–VI' },
              ],
            },
            {
              id: 'plato-phaedrus',
              title: 'Phaedrus',
              author: 'Plato',
              context: {
                background:
                  'A walk outside the walls of Athens: speeches on love, the soul as a winged charioteer, and a closing critique of writing itself.',
                placement:
                  'The traditional close of the freshman year: eros and rhetoric reconsidered among friends rather than adversaries — and a warning about the written word, aimed at every book on this list, to carry into three more years of them.',
              },
              commentary: [{ id: 'jowett-introduction', title: 'Jowett’s Introduction' }],
              sections: [
                {
                  id: 'phaedrus-1',
                  title: 'The complete dialogue',
                  hasText: true,
                  meta: { cite: '227a–279c', estLength: '~1.5 hrs' },
                },
              ],
            },
          ],
        },
        {
          id: 'y1-language',
          name: 'Language',
          intro:
            'Ancient Greek — not for mastery but for precision: reading a few of the seminar’s works free of the veil of ready-made translation, and seeing what every translation decides for you.',
          books: [
            {
              id: 'greek-tutorial',
              title: 'Ancient Greek',
              author: 'Language Tutorial',
              context: {
                background:
                  'Attic Greek: alphabet, grammar, and translation, culminating in passages of Plato’s Meno read in the original.',
                placement:
                  'The tutorial closes the gap the seminar opens — everything there is read in translation. Translating even a little Plato shows what every translation decides for you: logos, arete, psyche.',
              },
              sections: [
                { id: 'greek-1', title: 'Grammar & morphology' },
                { id: 'greek-2', title: 'Translation: selections (incl. Plato’s Meno)' },
              ],
            },
            {
              id: 'sappho-poems',
              title: 'Poems',
              author: 'Sappho',
              context: {
                background:
                  'Sappho of Lesbos (c. 600 BC), antiquity’s great lyric poet, survives in fragments; poems 1 and 31 are the most complete.',
                placement:
                  'Studied in the language tutorial as the first sustained Greek poetry after Homer: the lyric first person against epic’s heroes — one voice describing desire with clinical precision.',
              },
              sections: [{ id: 'sappho-1', title: 'Poems 1 and 31' }],
            },
            {
              id: 'woolf-greek',
              title: 'On Not Knowing Greek',
              author: 'Virginia Woolf',
              context: {
                background:
                  'Virginia Woolf’s 1925 essay on the distance between us and the Greeks — why we cannot quite know them, and why we keep trying.',
                placement:
                  'The tutorial’s self-examination: a great modern writer asking what the whole freshman year is doing reading Greek at all.',
              },
              sections: [{ id: 'woolf-1', title: 'The essay' }],
            },
          ],
        },
        {
          id: 'y1-mathematics',
          name: 'Mathematics',
          intro:
            'Mathematics begins with Euclid read whole and demonstrated at the board — a firsthand notion of deductive science — before Ptolemy shows mathematics applied to the heavens.',
          books: [
            {
              id: 'euclid-elements',
              title: 'Elements',
              author: 'Euclid',
              context: {
                background:
                  'The Elements (c. 300 BC) organizes Greek mathematics into definitions, postulates, and demonstrations — from a point to the five regular solids — and stood as the model of rigorous knowledge for two millennia.',
                placement:
                  'Freshman mathematics is Euclid demonstrated at the board, proposition by proposition: deductive science experienced firsthand — the certainty the Republic’s divided line describes — with the theory of ratios that lies buried under modern mathematics.',
              },
              edition: 'Heath trans. (Green Lion Press)',
              sections: [
                { id: 'euclid-1', title: 'Book I' },
                { id: 'euclid-2', title: 'Books II–IV' },
                { id: 'euclid-3', title: 'Books V–VI' },
                { id: 'euclid-4', title: 'Books VII–IX' },
                { id: 'euclid-5', title: 'Book X' },
                { id: 'euclid-6', title: 'Books XI–XIII' },
              ],
            },
            {
              id: 'nicomachus-arithmetic',
              title: 'Arithmetic',
              author: 'Nicomachus',
              context: {
                background:
                  'Nicomachus of Gerasa (c. 100 AD), a neo-Pythagorean, wrote the standard ancient introduction to arithmetic: kinds of number, figurate numbers, proportion.',
                placement:
                  'A Pythagorean counterpoint to Euclid: number contemplated rather than constructed — arithmetic as the Republic’s course of study imagined it.',
              },
              sections: [{ id: 'nicomachus-1', title: 'Selections' }],
            },
            {
              id: 'ptolemy-almagest',
              title: 'Almagest',
              author: 'Ptolemy',
              context: {
                background:
                  'Ptolemy’s Almagest (2nd century AD) is the summa of ancient astronomy: the geocentric heavens worked out with complete geometric rigor.',
                placement:
                  'Where Euclid shows demonstration, Ptolemy shows mathematics applied to phenomena — hypotheses constructed to save the appearances. Sophomore mathematics takes him up in earnest, before Copernicus overthrows him.',
              },
              sections: [{ id: 'almagest-1', title: 'Selections' }],
            },
          ],
        },
        {
          id: 'y1-laboratory',
          name: 'Laboratory',
          intro:
            'Nature studied through original treatises and papers rather than textbooks: watching concepts like circulation, element, and cell get made, beginning from Aristotle’s animals.',
          books: [
            {
              id: 'aristotle-biology',
              title: 'Parts of Animals & Generation of Animals',
              author: 'Aristotle',
              context: {
                background:
                  'Aristotle the biologist: Parts of Animals defends studying even humble creatures — there are gods here too — and Generation of Animals asks how living form comes to be.',
                placement:
                  'The laboratory begins where the seminar’s Aristotle ends: the same causes and forms, now confronted with actual animals. Harvey, Virchow, and Driesch all write in his shadow.',
              },
              sections: [
                { id: 'arist-bio-1', title: 'Parts of Animals (selections)' },
                { id: 'arist-bio-2', title: 'Generation of Animals (selections)' },
              ],
            },
            {
              id: 'harvey-motion',
              title: 'On the Motion of the Heart and Blood in Animals',
              author: 'William Harvey',
              context: {
                background:
                  'William Harvey’s 1628 treatise demonstrated the circulation of the blood by ligature, measurement, and argument — physiology’s founding experiment.',
                placement:
                  'The first modern in the freshman laboratory: Aristotelian in training and in style of argument, yet overturning ancient authority by quantitative experiment. The pivot from reading nature to interrogating it.',
              },
              sections: [{ id: 'harvey-1', title: 'The complete treatise' }],
            },
            {
              id: 'biology-essays',
              title: 'Biology Essays',
              author: 'Various',
              context: {
                background:
                  'Nineteenth- and twentieth-century papers in which biology found its units: Virchow’s cells, Driesch’s embryos, Spemann’s organizer, Mariotte’s plants.',
                placement:
                  'A continuing argument with Aristotle’s question — what makes an organism one being? — carried on with microscopes and experiments.',
              },
              sections: [
                { id: 'bio-essays-1', title: 'Virchow — Cellular Pathology Lectures' },
                { id: 'bio-essays-2', title: 'Driesch — The Science and Philosophy of the Organism' },
                { id: 'bio-essays-3', title: 'Spemann — The Organizer-Effect in Embryonic Development' },
                { id: 'bio-essays-4', title: 'Mariotte — Essays' },
              ],
            },
            {
              id: 'archimedes-mechanics',
              title: 'On the Equilibrium of Planes · On Floating Bodies',
              author: 'Archimedes',
              context: {
                background:
                  'Archimedes of Syracuse (c. 287–212 BC): statics and hydrostatics established by geometric proof — the lever, centers of gravity, floating bodies.',
                placement:
                  'Euclid’s method leaving the page: physical law demonstrated like geometry. The bridge between the mathematics tutorial and experimental science.',
              },
              sections: [
                { id: 'archimedes-1', title: 'On the Equilibrium of Planes' },
                { id: 'archimedes-2', title: 'On Floating Bodies' },
              ],
            },
            {
              id: 'pascal-liquids',
              title: 'Treatise on the Equilibrium of Liquids',
              author: 'Blaise Pascal',
              context: {
                background:
                  'Pascal’s treatise (published 1663) extends hydrostatics: pressure transmitted through fluids, the weight of the air, equilibrium explained by experiment.',
                placement:
                  'Continues Archimedes with early-modern instruments — the barometer where the Greek had the balance.',
              },
              sections: [{ id: 'pascal-1', title: 'The complete treatise' }],
            },
            {
              id: 'lavoisier-chemistry',
              title: 'Elements of Chemistry',
              author: 'Antoine Lavoisier',
              context: {
                background:
                  'Lavoisier’s Elements of Chemistry (1789) refounded the science: conservation of mass, oxygen against phlogiston, and a new language of elements.',
                placement:
                  'The laboratory’s chemical revolution: element, debated since On Generation and Corruption, becomes an experimental term. The essays that follow track what his balance-sheet method made possible.',
              },
              sections: [
                { id: 'lavoisier-1', title: 'Part I' },
                { id: 'lavoisier-2', title: 'Parts II–III (selections)' },
              ],
            },
            {
              id: 'chemistry-essays',
              title: 'Chemistry Essays',
              author: 'Various',
              context: {
                background:
                  'The papers in which modern chemistry assembled itself, from Black’s fixed air to Mendeleev’s periodic law.',
                placement:
                  'Read in sequence as one long inference: how weighing gases led, step by argued step, to atoms — Lucretius’ speculation become laboratory fact.',
              },
              sections: [
                { id: 'chem-essays-1', title: 'Black — Lectures on the Elements of Chemistry' },
                { id: 'chem-essays-2', title: 'Fahrenheit — The Fahrenheit Scale' },
                { id: 'chem-essays-3', title: 'Gay-Lussac — On the Expansion of Gases by Heat; On the Combination of Gaseous Substances' },
                { id: 'chem-essays-4', title: 'Dalton — A New System of Chemical Philosophy (extracts)' },
                { id: 'chem-essays-5', title: 'Berthollet & Proust — the proportions debate' },
                { id: 'chem-essays-6', title: 'Avogadro — On the Relative Masses of Elementary Molecules' },
                { id: 'chem-essays-7', title: 'Cannizzaro — Letter to Professor S. De Luca' },
                { id: 'chem-essays-8', title: 'Mendeleev — The Periodic Law of the Chemical Elements' },
                { id: 'chem-essays-9', title: 'J.J. Thomson — System of Chemistry (extracts)' },
              ],
            },
          ],
        },
      ],
    },
    { id: 'year-2', label: 'Year 2', name: 'Sophomore', tracks: [] },
    { id: 'year-3', label: 'Year 3', name: 'Junior', tracks: [] },
    { id: 'year-4', label: 'Year 4', name: 'Senior', tracks: [] },
  ],
};

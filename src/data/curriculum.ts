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
          books: [
            {
              id: 'homer-iliad',
              title: 'Iliad',
              author: 'Homer',
              edition: 'Lattimore trans. (Chicago)',
              sections: [
                { id: 'iliad-1', title: 'Books I–IV' },
                { id: 'iliad-2', title: 'Books V–VIII' },
                { id: 'iliad-3', title: 'Books IX–XII' },
                { id: 'iliad-4', title: 'Books XIII–XVI' },
                { id: 'iliad-5', title: 'Books XVII–XX' },
                { id: 'iliad-6', title: 'Books XXI–XXIV' },
              ],
            },
            {
              id: 'homer-odyssey',
              title: 'Odyssey',
              author: 'Homer',
              edition: 'Lattimore trans. (Harper)',
              sections: [
                { id: 'odyssey-1', title: 'Books I–IV' },
                { id: 'odyssey-2', title: 'Books V–VIII' },
                { id: 'odyssey-3', title: 'Books IX–XII' },
                { id: 'odyssey-4', title: 'Books XIII–XVI' },
                { id: 'odyssey-5', title: 'Books XVII–XX' },
                { id: 'odyssey-6', title: 'Books XXI–XXIV' },
              ],
            },
            {
              id: 'plato-meno',
              title: 'Meno',
              author: 'Plato',
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
              sections: [
                { id: 'plutarch-1', title: 'Lycurgus' },
                { id: 'plutarch-2', title: 'Solon' },
              ],
            },
            {
              id: 'herodotus-histories',
              title: 'Histories',
              author: 'Herodotus',
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
              sections: [{ id: 'clouds-1', title: 'The complete play' }],
            },
            {
              id: 'plato-apology',
              title: 'Apology',
              author: 'Plato',
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
              sections: [
                { id: 'euripides-1', title: 'Hippolytus' },
                { id: 'euripides-2', title: 'Bacchae' },
              ],
            },
            {
              id: 'plato-symposium',
              title: 'Symposium',
              author: 'Plato',
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
              sections: [
                { id: 'politics-1', title: 'Books I–IV' },
                { id: 'politics-2', title: 'Books V–VIII' },
              ],
            },
            {
              id: 'aristotle-poetics',
              title: 'Poetics',
              author: 'Aristotle',
              edition: 'Sachs trans. (Focus)',
              sections: [{ id: 'poetics-1', title: 'The complete treatise' }],
            },
            {
              id: 'aristotle-physics',
              title: 'Physics',
              author: 'Aristotle',
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
              sections: [{ id: 'gencorr-1', title: 'Selections' }],
            },
            {
              id: 'lucretius-nature',
              title: 'On the Nature of Things',
              author: 'Lucretius',
              sections: [
                { id: 'lucretius-1', title: 'Books I–III' },
                { id: 'lucretius-2', title: 'Books IV–VI' },
              ],
            },
            {
              id: 'plato-phaedrus',
              title: 'Phaedrus',
              author: 'Plato',
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
          books: [
            {
              id: 'greek-tutorial',
              title: 'Ancient Greek',
              author: 'Language Tutorial',
              sections: [
                { id: 'greek-1', title: 'Grammar & morphology' },
                { id: 'greek-2', title: 'Translation: selections (incl. Plato’s Meno)' },
              ],
            },
            {
              id: 'sappho-poems',
              title: 'Poems',
              author: 'Sappho',
              sections: [{ id: 'sappho-1', title: 'Poems 1 and 31' }],
            },
            {
              id: 'woolf-greek',
              title: 'On Not Knowing Greek',
              author: 'Virginia Woolf',
              sections: [{ id: 'woolf-1', title: 'The essay' }],
            },
          ],
        },
        {
          id: 'y1-mathematics',
          name: 'Mathematics',
          books: [
            {
              id: 'euclid-elements',
              title: 'Elements',
              author: 'Euclid',
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
              sections: [{ id: 'nicomachus-1', title: 'Selections' }],
            },
            {
              id: 'ptolemy-almagest',
              title: 'Almagest',
              author: 'Ptolemy',
              sections: [{ id: 'almagest-1', title: 'Selections' }],
            },
          ],
        },
        {
          id: 'y1-laboratory',
          name: 'Laboratory',
          books: [
            {
              id: 'aristotle-biology',
              title: 'Parts of Animals & Generation of Animals',
              author: 'Aristotle',
              sections: [
                { id: 'arist-bio-1', title: 'Parts of Animals (selections)' },
                { id: 'arist-bio-2', title: 'Generation of Animals (selections)' },
              ],
            },
            {
              id: 'harvey-motion',
              title: 'On the Motion of the Heart and Blood in Animals',
              author: 'William Harvey',
              sections: [{ id: 'harvey-1', title: 'The complete treatise' }],
            },
            {
              id: 'biology-essays',
              title: 'Biology Essays',
              author: 'Various',
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
              sections: [
                { id: 'archimedes-1', title: 'On the Equilibrium of Planes' },
                { id: 'archimedes-2', title: 'On Floating Bodies' },
              ],
            },
            {
              id: 'pascal-liquids',
              title: 'Treatise on the Equilibrium of Liquids',
              author: 'Blaise Pascal',
              sections: [{ id: 'pascal-1', title: 'The complete treatise' }],
            },
            {
              id: 'lavoisier-chemistry',
              title: 'Elements of Chemistry',
              author: 'Antoine Lavoisier',
              sections: [
                { id: 'lavoisier-1', title: 'Part I' },
                { id: 'lavoisier-2', title: 'Parts II–III (selections)' },
              ],
            },
            {
              id: 'chemistry-essays',
              title: 'Chemistry Essays',
              author: 'Various',
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

import type { Curriculum } from '../types';

// Seed: Year 1 → Seminar → Plato's Apology, divided by the natural movements
// of the speech (Stephanus pages noted). Locked entries sketch the roadmap
// without pretending to be built.

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
              id: 'plato-apology',
              title: 'Apology',
              author: 'Plato',
              edition: 'Grube trans. (Hackett), or Jowett (public domain)',
              sections: [
                {
                  id: 'apology-1',
                  title: 'I. Socrates’ Defense Begins',
                  meta: { cite: '17a–19a', estLength: '~10 min' },
                },
                {
                  id: 'apology-2',
                  title: 'II. The Old Accusers & the Oracle',
                  meta: { cite: '19a–24b', estLength: '~20 min' },
                },
                {
                  id: 'apology-3',
                  title: 'III. The Charge of Corrupting the Young',
                  meta: { cite: '24b–28a', estLength: '~15 min' },
                },
                {
                  id: 'apology-4',
                  title: 'IV. The Philosopher’s Station',
                  meta: { cite: '28a–32e', estLength: '~20 min' },
                },
                {
                  id: 'apology-5',
                  title: 'V. Conclusion of the Defense',
                  meta: { cite: '33a–35d', estLength: '~10 min' },
                },
                {
                  id: 'apology-6',
                  title: 'VI. The Verdict & the Counter-Penalty',
                  meta: { cite: '35e–38b', estLength: '~10 min' },
                },
                {
                  id: 'apology-7',
                  title: 'VII. On the Fear of Death',
                  meta: { cite: '38c–42a', estLength: '~15 min' },
                },
              ],
            },
            {
              id: 'plato-crito',
              title: 'Crito',
              author: 'Plato',
              locked: true,
              sections: [],
            },
            {
              id: 'aristotle-ethics',
              title: 'Nicomachean Ethics',
              author: 'Aristotle',
              locked: true,
              sections: [],
            },
          ],
        },
        { id: 'y1-language', name: 'Language', locked: true, books: [] },
        { id: 'y1-mathematics', name: 'Mathematics', locked: true, books: [] },
        { id: 'y1-music', name: 'Music', locked: true, books: [] },
      ],
    },
    { id: 'year-2', label: 'Year 2', name: 'Sophomore', locked: true, tracks: [] },
    { id: 'year-3', label: 'Year 3', name: 'Junior', locked: true, tracks: [] },
    { id: 'year-4', label: 'Year 4', name: 'Senior', locked: true, tracks: [] },
  ],
};

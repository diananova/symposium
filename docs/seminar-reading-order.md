# Freshman Seminar reading order (reference)

Source: St. John's College, Annapolis — Schedule of Seminar Readings,
Fall 2025 & Spring 2026.
https://www.sjc.edu/academic-programs/undergraduate/classes/seminar/annapolis-undergraduate-readings
(fetched 2026-07-10; the Santa Fe campus publishes a slightly different
schedule, and exact order shifts a little year to year)

This is the authority for **book order in `src/data/curriculum.ts`** —
the app treats book order as reading order. When adding or reordering
Year 1 content, reference this file rather than re-fetching.

## Scheduled seminar sequence, freshman year

1. Homer, *Iliad*
2. Homer, *Odyssey*
3. Plato, *Meno*
4. Aeschylus, *Agamemnon*
5. Aeschylus, *Libation Bearers*; *Eumenides*
6. Plato, *Gorgias*
7. Plutarch, *Lives* (Lycurgus; Solon)
8. Herodotus, *History*
9. Plato, *Republic*
10. Aristophanes, *Clouds*
11. Plato, *Apology* and *Crito*
12. Plato, *Phaedo*
13. Sophocles, *Oedipus Tyrannus*
14. Sophocles, *Oedipus at Colonus*
15. Sophocles, *Antigone*
16. Euripides, *Medea*
17. Plato, *Symposium*
18. Thucydides, *Peloponnesian War*
19. Plato, *Parmenides*
20. Plato, *Theaetetus*
21. Plato, *Sophist*
22. Plato, *Timaeus*
23. Aristotle, *Nicomachean Ethics*
24. Aristotle, *Politics*
25. Sophocles, *Philoctetes*
26. Euripides, *The Bacchae*
27. Aristotle, *Poetics*
28. Aristotle, *Physics*
29. Aristotle, *Metaphysics*
30. Aristotle, *On the Soul*
31. Plato, *Phaedrus* (closes the year)

## Mapping notes for `curriculum.ts`

- The app groups plays into one book per author, placed at the author's
  *first* appearance in the schedule: Aeschylus at #4 (with *Prometheus
  Bound*, which is on the official reading list but not this year's
  schedule), Sophocles at #13–15 (with *Philoctetes* from #25 and *Ajax*
  from the reading list), Euripides after Sophocles (the reading list has
  *Hippolytus* + *Bacchae*; this year's schedule ran *Medea* + *Bacchae*).
- *Apology* and *Crito* share one seminar slot (#11) but are separate books
  in the app, in that order.
- On the official reading list but not this year's seminar schedule:
  Lucretius (*On the Nature of Things*) and Aristotle (*On Generation and
  Corruption*) — slotted at natural points near the end (after Metaphysics,
  before Phaedrus).
- Scheduled but not on the official freshman reading list: Aristotle,
  *On the Soul* — currently omitted from the app.
- Language / Mathematics / Laboratory tracks run in parallel all year and
  have no published per-session order; their book order in the app is a
  sensible pedagogical sequence, not a schedule.

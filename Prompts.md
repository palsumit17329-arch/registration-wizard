# Prompts.md

Per the Sprint 07 "Learn, Don't Copy" mandate, this file logs AI-assisted
debugging/architecture sessions used while building this project. Add an
entry each time you consult an AI tool — keep it factual, not a transcript
dump, and make sure you can explain every line that ended up in the repo.

---

## Session 1 — Wizard architecture & scaffolding

**Tool:** Claude (Anthropic)
**Date:** _fill in the date you actually ran this_
**What I asked:** How to structure a 3-step registration wizard with state
lifted to a parent component, real-time validation, a disabled Next button
until the step is valid, a password show/hide toggle, and a progress bar —
using React Hook Form + Zod per the Phase 3 requirement.

**What I learned / used:**
- Lifting `formData` into the parent (`App.jsx`) and seeding each step's
  `useForm({ defaultValues })` from it is what makes Back/Next preserve
  input, since each step's form re-mounts with the parent's latest values.
- `zodResolver` + `mode: 'onChange'` gives per-keystroke validation without
  hand-rolled `onChange` handlers per field.
- `formState.isValid` (driven by the Zod schema) is what should gate the
  Next button — not a manually maintained `useState`.
- Buttons inside a `<form>` default to `type="submit"`; the Back button
  needs `type="button"` explicitly or it will trigger the form's submit
  handler.

**What I changed / verified myself before committing:**
- Tightened the email/password rules beyond the brief's bare minimum
  (documented in README.md) — reviewed that this doesn't break the "at
  least 8 characters" / "contains @" acceptance criteria.
- Walked through the Back-then-Next flow manually in the browser to
  confirm state actually persists (not just trusting the explanation).
- Read and understood every line in `wizardSchema.js`, `App.jsx`, and the
  step components before committing — nothing was pasted in blind.

---

## Session template (copy for future sessions)

**Tool:**
**Date:**
**What I asked:**
**What I learned / used:**
**What I changed / verified myself before committing:**

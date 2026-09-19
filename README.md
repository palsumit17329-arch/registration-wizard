# Registration Wizard

A multi-step ("wizard") registration form built for Sprint 07. Collects
personal info, account credentials, and a final review step, with state
lifted to a parent component so data survives back-and-forth navigation.

## Stack

- React 18 + Vite
- React Hook Form (uncontrolled, high-performance form state)
- Zod (schema-based validation, via `@hookform/resolvers/zod`)

This satisfies Phase 1 (base wizard + state lifting), Phase 2 (real-time
validation, disabled Next button, show/hide password, progress bar), and
Phase 3 (React Hook Form + Zod schema validation) from the sprint brief.

## Project structure

```
registration-wizard/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── SRS.md
├── Prompts.md
└── src/
    ├── main.jsx
    ├── App.jsx                     # wizard orchestrator, lifted state
    ├── App.css
    ├── schema/
    │   └── wizardSchema.js         # Zod schemas per step
    └── components/
        ├── ProgressBar.jsx
        ├── StepPersonalInfo.jsx    # Step 1
        ├── StepAccountDetails.jsx  # Step 2
        └── StepReview.jsx          # Step 3
```

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build a production bundle for Vercel/Netlify:

```bash
npm run build
```

The output goes to `dist/`. Deploy that folder (Vercel/Netlify both auto-detect
a Vite project if you point them at this repo instead).

## How it works

- **State lifting**: `App.jsx` holds `formData`, the single source of truth
  for the whole payload. Each step uses its own `useForm()` instance
  (Personal Info, Account Details) seeded with `defaultValues` from
  `formData`, so navigating **Back** never loses what was typed.
- **Validation**: each step has a Zod schema (`src/schema/wizardSchema.js`)
  wired in via `zodResolver`. `mode: 'onChange'` means errors show up as you
  type, not just on submit.
- **Next button disabling**: each step's `formState.isValid` (derived from
  its Zod schema) drives the `disabled` prop on that step's Next/Submit
  button.
- **Show/Hide password**: `StepAccountDetails.jsx` toggles the `type`
  attribute of the password inputs between `"password"` and `"text"` off a
  local boolean, independently for the password and confirm-password
  fields.
- **Progress bar**: `ProgressBar.jsx` renders a filled track sized to
  `currentStep / totalSteps` plus a "Step X of 3" label.
- **Submission**: Step 3 renders a read-only summary (`StepReview.jsx`) of
  `formData`. Clicking **Submit** logs the finalized object to the console
  and flips the UI to a success state — no backend call, per the brief.

## Notes on validation rules

- First/last name: required, minimum 2 characters.
- Date of birth: required, must resolve to an age of 13+.
- Email: required, must match `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- Password: minimum 8 characters, at least one uppercase letter and one
  number.
- Confirm password: must exactly match password (enforced via Zod's
  `.refine()`, surfaced on the `confirmPassword` field).

These are intentionally a little stricter than the brief's bare minimum
(8-char password, `@` in email) to demonstrate schema-level cross-field
validation — adjust `wizardSchema.js` if the stricter rules aren't wanted.

## QA / demo checklist

- [ ] Type into Step 1, click Next, click Back — data still there.
- [ ] Leave email without `@` — inline red error appears as you type.
- [ ] Password under 8 characters — Next stays disabled.
- [ ] Confirm password mismatch — error shows under that field.
- [ ] Toggle the eye icon — password becomes visible/hidden.
- [ ] Progress bar reads "Step 2 of 3" etc. as you move through.
- [ ] Submit on Step 3 — check browser console for the logged object.

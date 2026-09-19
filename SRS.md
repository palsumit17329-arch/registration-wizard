# Software Requirements Specification

**Project:** Registration Wizard (Sprint 07)
**Version:** 1.0
**Author:** Hyper boii

## 1. Purpose

This document specifies the functional and non-functional requirements for
a multi-step client-side registration wizard, as assigned in Sprint 07. It
is intended as a reference for implementation and QA sign-off, and to be
included in the repository alongside the code.

## 2. Scope

The system is a single-page React application that collects a user's
personal information and account credentials across three sequential
views, validates the input in real time, and logs a finalized payload to
the browser console on submission. No backend integration, persistence, or
network request is in scope — this is a client-side data-compilation
exercise only.

## 3. Definitions

| Term | Meaning |
|---|---|
| Wizard | The overall multi-step form flow |
| Step / View | One of the three screens (Personal Info, Account Details, Review) |
| Payload | The unified object of all collected fields |
| RHF | React Hook Form |

## 4. Functional requirements

### FR-1 — Step navigation
The system shall present exactly three views, toggled by conditional
rendering on a single route (no client-side router). At any time exactly
one view shall be visible.

### FR-2 — Step 1: Personal Info
The system shall collect: First Name, Last Name, Date of Birth. All three
are required. Names must be at least 2 characters. Date of birth must
correspond to an age of 13 or older.

### FR-3 — Step 2: Account Details
The system shall collect: Email, Password, Confirm Password.
- Email is required and must match the pattern `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
- Password is required, minimum 8 characters, must contain at least one
  uppercase letter and one digit.
- Confirm Password must exactly equal Password.

### FR-4 — Step 3: Review & Submit
The system shall render a read-only summary of every field captured in
Steps 1 and 2 (password displayed masked). A Submit action shall be
available.

### FR-5 — State persistence across navigation
Values entered in any step shall persist if the user navigates to another
step and back (via Back or by re-entering a step), without requiring
re-entry.

### FR-6 — Real-time validation
Field-level validation shall run on change, not only on submit. Invalid
fields shall display an inline error message beneath the field.

### FR-7 — Step gating
The "Next" control on Steps 1 and 2 shall be disabled until every field on
the currently active step passes validation.

### FR-8 — Password visibility toggle
Both the Password and Confirm Password fields shall each provide an
independent control to toggle between masked and plain-text display.

### FR-9 — Progress indication
The system shall display a visual indicator of progress through the
wizard (e.g., a filled bar plus a "Step X of 3" text label), updated as
the active step changes.

### FR-10 — Submission
On Submit (Step 3), the system shall write the complete payload to the
console (`console.log`) and transition the UI to a confirmation/success
state. No network request shall be made.

## 5. Non-functional requirements

- **NFR-1 (Performance):** Field-level re-renders shall be isolated per
  input where practical (addressed by using React Hook Form's uncontrolled
  registration instead of a `useState` per keystroke).
- **NFR-2 (Portability):** The build shall run identically on Vercel and
  Netlify. File names/imports shall match on-disk casing exactly (Linux
  build servers are case-sensitive).
- **NFR-3 (Accessibility):** Inputs shall have associated labels;
  invalid fields shall be marked with `aria-invalid`.
- **NFR-4 (No native validation UI):** The system shall not rely on HTML5
  `required`/`pattern` browser validation UI; all validation feedback is
  custom-rendered.

## 6. Out of scope

- Server-side persistence or authentication.
- Password strength beyond the stated rule set.
- Internationalization.
- React Router / deep-linkable step URLs.

## 7. Acceptance criteria

See the QA / demo checklist in `README.md`. All items must pass before the
QA demo video is recorded.

## 8. Traceability to sprint phases

| Sprint phase | Requirements covered |
|---|---|
| Phase 1 (Base MVP) | FR-1, FR-2, FR-3, FR-4, FR-5, FR-10 |
| Phase 2 (Validation & UX polish) | FR-6, FR-7, FR-8, FR-9 |
| Phase 3 (Enterprise architecture) | Implemented via RHF + Zod throughout (NFR-1) |

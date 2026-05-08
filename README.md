# SDD Registration Form

A modern frontend registration form application built using **Spec-Driven Development (SDD)** principles.

This project demonstrates how software systems can be developed using a **specification-first workflow**, where all requirements, validation rules, UI behaviour, and constraints are formally defined before implementation.

---

# What is SDD?

**Spec-Driven Development (SDD)** is a software engineering methodology where the specification acts as the single source of truth for development.

Instead of directly writing code first:

1. Requirements are formally documented
2. Validation rules are defined in advance
3. UI behaviour is specified before implementation
4. Developers implement strictly according to the spec
5. The specification becomes traceable to the codebase

This approach improves:

- Maintainability
- Scalability
- Team communication
- Requirement clarity
- Validation consistency
- Debugging and testing

---

# Features

- User Registration Form
- Real-time Form Validation
- Password Strength Validation
- Confirm Password Matching
- Error Handling
- Responsive User Interface
- Terms & Conditions Validation
- Structured Validation Rules
- Spec-to-Code Traceability

---

# Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page Structure |
| CSS3 | Styling and Responsive UI |
| JavaScript | Validation and Interactivity |
| YAML | Specification Definition |

---

# Project Structure

```text
Spec-Driven-Development/
│
├── spec/
│   └── spec.yaml
│
├── src/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── README.md
└── .gitignore
```

---

# Architecture

## 1. Specification Layer

### `spec/spec.yaml`

Defines:

- Form fields
- Validation rules
- Error messages
- UI behaviour
- Allowed values
- Business constraints
- Out-of-scope features

The specification acts as the blueprint for the project.

Example:

```yaml
- id: REG-F02
  name: email
  label: "Email Address"
  type: email
  required: true
```

---

## 2. Frontend Layer

### `src/index.html`

Responsible for:

- Rendering form structure
- Connecting input fields
- Layout implementation

---

## 3. Styling Layer

### `src/style.css`

Responsible for:

- Responsive design
- Error states
- Input focus states
- Password strength UI
- Layout spacing

---

## 4. Logic Layer

### `src/script.js`

Responsible for:

- Form validation
- Password checks
- Error handling
- Submission checks
- Real-time feedback

Validation logic maps directly to specification rule IDs.

Example:

```javascript
// REG-F02-R02
```

This creates traceability between requirements and implementation.

---

# Validation Rules

## Full Name

- Required field
- Minimum 2 characters
- Maximum 80 characters
- Only letters and spaces allowed

## Email

- Must follow valid email format

## Age

- Must be between 13 and 120

## Password

Must contain:

- Uppercase letter
- Lowercase letter
- Number
- Special character
- Minimum length

## Confirm Password

- Must match password exactly

## Terms & Conditions

- Must be accepted before submission

---

# Spec Traceability

| Spec ID | Description |
|---|---|
| REG-F01 | Full Name |
| REG-F02 | Email Address |
| REG-F03 | Age |
| REG-F04 | Gender |
| REG-F05 | Password |
| REG-F06 | Confirm Password |
| REG-F07 | Terms & Conditions |

---

# Out of Scope

The following features are intentionally excluded:

- Backend integration
- Database storage
- JWT authentication
- OAuth login
- Email verification
- API integration

---

# How to Run

## Option 1 — Open Directly

Open:

```text
src/index.html
```

in a browser.

---

## Option 2 — VS Code Live Server

1. Open project in VS Code
2. Install Live Server extension
3. Right-click `index.html`
4. Click:

```text
Open With Live Server
```

---



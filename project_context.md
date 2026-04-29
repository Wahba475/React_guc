# Functional Specification (Frontend-Only Simulation)

## Goal

Convert the existing UI into a fully interactive frontend system using simple state and localStorage.

No backend. No APIs. No complex architecture.

---

# Users

## Capabilities:

- Register
- Login
- Edit profile
- Upload profile image

## Data Structure:

- id
- role (student / employer / instructor)
- name
- email
- skills
- image
- projects (array of project IDs)
- applications (internship IDs)

---

# Authentication

## Register:

- Add user to users array
- Save to localStorage
- Set as current user

## Login:

- Match email
- Load user
- Save session in localStorage

---

# Projects

## Create:

- title
- description

## Behavior:

- Add to projects array
- Link to owner (current user)

---

## View:

- Show:
  - user’s projects
  - public projects

---

## Project Details:

Each project contains:

- title
- description
- collaborators
- tasks
- comments

---

# Tasks

## Add Task:

- description
- assigned user

## Update:

- mark as completed / not completed

---

# Comments

## Add Comment:

- text
- user name
- timestamp

---

# Collaboration

## Add Collaborator:

- Add user ID to project

(No invitation system required)

---

# Internships

## Employer:

- Create internship
- View applicants

## Student:

- Apply to internship

---

## Internship Data:

- id
- title
- company
- description
- applicants (user IDs)
- status (open/closed)

---

## Apply Behavior:

- Add user ID to applicants
- Prevent duplicate applications

---

# Dashboard

Display:

- number of projects
- number of applications
- simple recent activity list

---

# Search / Filter

## Projects:

- search by title

## Internships:

- filter by company or title

---

# Data Storage

## Use:

- React useState
- localStorage

---

## On App Load:

- load all data from localStorage
- load current user

---

## On Update:

- update state
- save to localStorage

---

# UI Behavior

- No page reloads
- Instant UI updates
- Basic feedback (button state / text)

---

# Constraints

- No backend
- No APIs
- No complex patterns
- Keep everything simple and readable

---

# Final Goal

The app should simulate a real platform where:

- users can register
- create projects
- apply to internships
- collaborate
- and see persistent changes

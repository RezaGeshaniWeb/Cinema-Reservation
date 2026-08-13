# Cinema Reservation System

A fully functional, command-line cinema seat reservation system built with plain Node.js (no external libraries). Users can view a seating chart, reserve seats, cancel reservations, and exit the program through a simple interactive menu.

> **How this project was built:** This application was generated and implemented from the specifications defined in [`Prompt.txt`](./Prompt.txt). That file contains the full project brief — role, objectives, tech stack, features, seating model, CLI menu layout, code requirements, and educational goals — and served as the single source of truth for building the system.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [How to Use](#how-to-use)
- [Seating Model](#seating-model)
- [Menu Options](#menu-options)
- [Input Validation & Error Handling](#input-validation--error-handling)
- [Code Architecture](#code-architecture)
- [Educational Goals](#educational-goals)
- [Example Session](#example-session)
- [License](#license)

---

## Overview

The Cinema Reservation System simulates a small cinema hall with a fixed grid of seats (**5 rows × 6 columns**). Seat state is kept in memory using a 2D array:

| Symbol | Meaning   |
|--------|-----------|
| `O`    | Available |
| `X`    | Reserved  |

The program runs in a continuous loop until the user chooses **Exit**. After every action, control returns to the main menu with clear success or error messages.

This project was designed and built according to the instructions in **`Prompt.txt`**, which describes the intended CLI workflow, modular function names, validation rules, and learning outcomes.

---

## Features

1. **Display Seating Chart** — Print the current seat status in a labeled grid (`O` / `X`).
2. **Reserve a Seat** — Select a row and column; reserve if available, or show an error if already taken.
3. **Cancel Reservation** — Free a previously reserved seat; only reserved seats can be canceled.
4. **Input Validation** — Reject invalid, non-numeric, decimal, empty, or out-of-range row/column values.
5. **Seat Availability Check** — Always verify seat state before reserve or cancel operations.
6. **Safe Exit** — Shut down the CLI gracefully and close the input interface.

---

## Tech Stack

| Item              | Detail                                      |
|-------------------|---------------------------------------------|
| Runtime           | Node.js                                     |
| Language          | JavaScript (CommonJS)                       |
| UI                | Command Line Interface (CLI) only           |
| Dependencies      | None (uses built-in `readline` module only) |
| Data structures   | Nested arrays (2D grid), constants, functions |

No `package.json` or third-party packages are required.

---

## Project Structure

```
Cinema-Reservation/
├── Prompt.txt              # Original project specification / build prompt
├── cinema-reservation.js   # Full working CLI application + code explanation
└── README.md               # Project documentation (this file)
```

| File                    | Purpose |
|-------------------------|---------|
| `Prompt.txt`            | The prompt used to create this project — defines requirements, menu layout, features, and coding standards. |
| `cinema-reservation.js` | Complete runnable program with modular functions and an inline code explanation. |
| `README.md`             | Documentation for setup, usage, and architecture. |

---

## Requirements

- [Node.js](https://nodejs.org/) installed (any recent LTS version is fine)
- A terminal (PowerShell, Command Prompt, macOS Terminal, or Linux shell)

No npm install step is needed.

---

## Getting Started

1. Clone or download this repository.
2. Open a terminal in the project folder:

   ```bash
   cd Cinema-Reservation
   ```

3. Run the application:

   ```bash
   node cinema-reservation.js
   ```

4. Use the on-screen menu to interact with the system.

---

## How to Use

When the program starts, you will see:

```
=========================
 Cinema Reservation System
=========================

1. Show Seats
2. Reserve Seat
3. Cancel Reservation
4. Exit

Choose an option:
```

| Option | Action |
|--------|--------|
| `1`    | Show the current seating chart |
| `2`    | Reserve a seat (enter row, then column) |
| `3`    | Cancel a reservation (enter row, then column) |
| `4`    | Exit the program |

Rows are numbered **1–5**. Columns are numbered **1–6**.

---

## Seating Model

The hall is a **5 × 6** grid stored as a 2D array. Example after reserving two seats:

```
Current Seating Chart:
(O = Available, X = Reserved)

Row 1: O O O O O O
Row 2: O O X O O O
Row 3: O O O O X O
Row 4: O O O O O O
Row 5: O O O O O O
```

User-facing coordinates are **1-based**; the code converts them to **0-based** indexes when reading or updating the array.

---

## Menu Options

### 1. Show Seats

Calls `show_seats()` and prints every row with its current status.

### 2. Reserve Seat

Calls `reserve_seat()`:

- Prompts for row and column
- Validates input and range
- Marks the seat as `X` if it is `O`
- Shows an error if the seat is already reserved

### 3. Cancel Reservation

Calls `cancel_seat()`:

- Prompts for row and column
- Validates input and range
- Marks the seat as `O` if it is `X`
- Shows an error if the seat is not reserved

### 4. Exit

Prints a goodbye message, stops the menu loop, and closes the `readline` interface.

---

## Input Validation & Error Handling

The application is designed to fail safely without stack traces:

- Empty input, decimals, and non-integers are rejected
- Values less than `1` are rejected
- Row/column outside the hall dimensions are rejected
- Invalid menu choices (anything other than `1`–`4`) show a friendly error
- Reserve/cancel always check current seat state before mutating

Typical messages:

- `Error: Row and column must be valid whole numbers.`
- `Error: Seat position is out of range. Valid rows: 1-5, columns: 1-6.`
- `Error: This seat is already reserved.`
- `Error: This seat is not reserved.`
- `Error: Invalid option. Please choose 1, 2, 3, or 4.`

---

## Code Architecture

Core functions (aligned with `Prompt.txt`):

| Function            | Responsibility |
|---------------------|----------------|
| `createSeatingChart`| Build the initial `O`-filled 2D seat grid |
| `show_seats`        | Print the seating chart |
| `reserve_seat`      | Reserve an available seat |
| `cancel_seat`       | Cancel an existing reservation |
| `main_menu`         | Display menu and dispatch actions in a loop |
| `start`             | Bootstrap seats + readline, then enter the menu |

Supporting helpers:

| Function               | Responsibility |
|------------------------|----------------|
| `askQuestion`          | Promise wrapper around `readline.question` |
| `parsePositiveInteger` | Parse and validate whole-number input |
| `isValidSeatPosition`  | Check that row/column are inside the grid |
| `printMainMenu`        | Render the CLI menu header and options |

**State management:** Seat data lives in a single `seats` array created at startup and passed into feature functions (no unnecessary globals). Changes persist in memory for the lifetime of the process.

A detailed **Code Explanation** (storage model, reservation logic, validation, and function interaction) is included at the bottom of `cinema-reservation.js`.

---

## Educational Goals

As specified in `Prompt.txt`, this project demonstrates:

- Working with **2D arrays** in JavaScript
- **Functions** and modular program structure
- **Loops** (`while`, `for`) and **conditionals**
- Basic **input validation** and user-friendly errors
- Simple **state management** in a CLI application
- Asynchronous user input with Node.js `readline` and Promises

---

## Example Session

```text
=========================
 Cinema Reservation System
=========================

1. Show Seats
2. Reserve Seat
3. Cancel Reservation
4. Exit

Choose an option: 2
Enter row number: 2
Enter column number: 3

Success: Seat at row 2, column 3 has been reserved.

Choose an option: 1

Current Seating Chart:
(O = Available, X = Reserved)

Row 1: O O O O O O
Row 2: O O X O O O
Row 3: O O O O O O
Row 4: O O O O O O
Row 5: O O O O O O

Choose an option: 4

Thank you for using Cinema Reservation System. Goodbye!
```

---

## Acknowledgments

Built from the project specification in **`Prompt.txt`**, which outlines the Cinema Seat Reservation System requirements, CLI design, and educational objectives for a clean, realistic JavaScript CLI application.

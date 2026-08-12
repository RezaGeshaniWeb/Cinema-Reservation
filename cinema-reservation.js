const readline = require("readline");

const ROWS = 5;
const COLS = 6;
const AVAILABLE = "O";
const RESERVED = "X";

function createSeatingChart(rows, cols) {
  const seats = [];
  for (let row = 0; row < rows; row++) {
    const seatRow = [];
    for (let col = 0; col < cols; col++) {
      seatRow.push(AVAILABLE);
    }
    seats.push(seatRow);
  }
  return seats;
}

function askQuestion(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim()));
  });
}

function parsePositiveInteger(value) {
  if (value === "" || value.includes(".")) {
    return null;
  }

  const number = Number(value);
  if (!Number.isInteger(number) || number < 1) {
    return null;
  }

  return number;
}

function isValidSeatPosition(row, col, seats) {
  return (
    row >= 1 &&
    row <= seats.length &&
    col >= 1 &&
    col <= seats[0].length
  );
}

function show_seats(seats) {
  console.log("\nCurrent Seating Chart:");
  console.log("(O = Available, X = Reserved)\n");

  for (let row = 0; row < seats.length; row++) {
    console.log(`Row ${row + 1}: ${seats[row].join(" ")}`);
  }

  console.log("");
}

async function reserve_seat(seats, rl) {
  const rowInput = await askQuestion(rl, "Enter row number: ");
  const colInput = await askQuestion(rl, "Enter column number: ");

  const row = parsePositiveInteger(rowInput);
  const col = parsePositiveInteger(colInput);

  if (row === null || col === null) {
    console.log("\nError: Row and column must be valid whole numbers.\n");
    return;
  }

  if (!isValidSeatPosition(row, col, seats)) {
    console.log(
      `\nError: Seat position is out of range. Valid rows: 1-${seats.length}, columns: 1-${seats[0].length}.\n`
    );
    return;
  }

  const rowIndex = row - 1;
  const colIndex = col - 1;

  if (seats[rowIndex][colIndex] === RESERVED) {
    console.log("\nError: This seat is already reserved.\n");
    return;
  }

  seats[rowIndex][colIndex] = RESERVED;
  console.log(`\nSuccess: Seat at row ${row}, column ${col} has been reserved.\n`);
}

async function cancel_seat(seats, rl) {
  const rowInput = await askQuestion(rl, "Enter row number to cancel: ");
  const colInput = await askQuestion(rl, "Enter column number to cancel: ");

  const row = parsePositiveInteger(rowInput);
  const col = parsePositiveInteger(colInput);

  if (row === null || col === null) {
    console.log("\nError: Row and column must be valid whole numbers.\n");
    return;
  }

  if (!isValidSeatPosition(row, col, seats)) {
    console.log(
      `\nError: Seat position is out of range. Valid rows: 1-${seats.length}, columns: 1-${seats[0].length}.\n`
    );
    return;
  }

  const rowIndex = row - 1;
  const colIndex = col - 1;

  if (seats[rowIndex][colIndex] === AVAILABLE) {
    console.log("\nError: This seat is not reserved.\n");
    return;
  }

  seats[rowIndex][colIndex] = AVAILABLE;
  console.log(
    `\nSuccess: Reservation at row ${row}, column ${col} has been canceled.\n`
  );
}

function printMainMenu() {
  console.log("=========================");
  console.log(" Cinema Reservation System");
  console.log("=========================");
  console.log("");
  console.log("1. Show Seats");
  console.log("2. Reserve Seat");
  console.log("3. Cancel Reservation");
  console.log("4. Exit");
  console.log("");
}

async function main_menu(seats, rl) {
  let running = true;

  while (running) {
    printMainMenu();
    const choice = await askQuestion(rl, "Choose an option: ");

    switch (choice) {
      case "1":
        show_seats(seats);
        break;
      case "2":
        await reserve_seat(seats, rl);
        break;
      case "3":
        await cancel_seat(seats, rl);
        break;
      case "4":
        console.log("\nThank you for using Cinema Reservation System. Goodbye!\n");
        running = false;
        break;
      default:
        console.log("\nError: Invalid option. Please choose 1, 2, 3, or 4.\n");
        break;
    }
  }

  rl.close();
}

function start() {
  const seats = createSeatingChart(ROWS, COLS);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  main_menu(seats, rl);
}

start();

/*
 * Code Explanation
 * ----------------
 *
 * How the seating system is stored in memory
 * The cinema hall is represented as a 2D array (nested arrays) created by
 * createSeatingChart(). Each inner array is one row of seats, and each seat
 * is a string: "O" for available or "X" for reserved. The entire grid lives
 * in a single seats variable that is passed into every feature function, so
 * all operations read and update the same in-memory state without global
 * variables.
 *
 * How reservation logic works
 * reserve_seat() prompts for a row and column, validates the input, converts
 * user-facing 1-based coordinates to 0-based array indexes, then checks
 * seats[rowIndex][colIndex]. If the seat is "O", it is changed to "X" and a
 * success message is shown. If it is already "X", an error is displayed.
 * cancel_seat() follows the same flow in reverse: only "X" seats can be
 * freed back to "O". show_seats() loops through the 2D array and prints each
 * row with a label so the user can see the current layout.
 *
 * How input validation is handled
 * parsePositiveInteger() rejects empty input, decimals, non-numeric text,
 * and numbers less than 1. isValidSeatPosition() ensures the row and column
 * fall within the grid bounds (1–5 for rows, 1–6 for columns). Invalid menu
 * choices in main_menu() are caught by the default switch case. All errors
 * produce user-friendly messages instead of throwing exceptions or stack traces.
 *
 * How functions interact with each other
 * start() bootstraps the program: it calls createSeatingChart() to build the
 * seats array, creates a readline interface, and hands both to main_menu().
 * main_menu() runs a while loop that displays the menu and dispatches to
 * show_seats(), reserve_seat(), or cancel_seat() based on the user's choice.
 * askQuestion() wraps readline in a Promise so async functions can await user
 * input cleanly. When the user selects Exit, main_menu() sets running to
 * false and closes the readline interface, ending the program gracefully.
 */

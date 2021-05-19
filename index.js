// Only execute the enclosed code after the document has loaded (otherwise DOM elements aren't detected).
window.onload = () => {
   // Add a click event to the button.
   document.querySelector("#generate-key-button").addEventListener("click", () => {
      // Clear existing list items
      // Note: Spread notation (...) is used to convert to an array, as document.getElementsByTagName returns an HTMLCollection, not an array.
      [ ...document.getElementsByTagName("li")].forEach(item => item.remove());
      // Generate 10 serial keys when the button is clicked.
      generateKeys(10);

      /* THROWS CONFETTI EVERYWHERE! (See confetti.js) */
      createConfetti(175);
   });

   // Confetti shenanigans

   setInterval(() => {
      for (const confetti of confettiList) {
         confetti.left += confetti.xVel;
         confetti.top += confetti.yVel;
         confetti.xVel *= 0.975;
         confetti.yVel *= 0.99;
         confetti.yVel += 0.05;
         confetti.updateVisuals();

         // If the confetti is out of bounds
         if (confetti.left <= -1 || confetti.left >= 101 || confetti.top >= 101) {
            confettiList.splice(confettiList.indexOf(confetti), 1);
            delete confetti;
         }
      }
   }, 20);

   // Random confetti
   setInterval(() => {
      createConfetti(2);
   }, 500);
}

function createListItem(key) {
   // Create a list item and change its text to the new key.
   const item = document.createElement("li");
   document.querySelector("#list-container").appendChild(item);
   item.innerHTML = key;
}

function generateKeys(keyN) {
   // Find a new key and create a new list item keyN times.
   for (let i = 0; i < keyN; i++) {
      const key = findValidKey();
      createListItem(key);
      console.log(key);
   }
}

function findValidKey() {
   // Constantly try new numbers until a valid key is found.
   while (true) {
      const input = getRandomInput();
      // Try to validate a random number.
      if (isValid(input)) {
         // Return the number and stop the loop when found.
         return input;
      }
   }
}

function getRandomInput() {
   let input = "";
   const numbers = "1234567890";
   // Adds a random digit 11 times, resulting in a random 11 digit number.
   for (let i = 0; i < 11; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      input += numbers.split("")[randomIndex];
   }
   return input;
}

function isValid(input) {
   let total = 0;
   // Loops through each of the reversed digits of the number.
   input.split("").reverse().forEach((v, index) => {
      // Converts the value from a string to and integer.
      const value = parseInt(v);
      // Add the value to the total.
      total += value;
      // Runs every second number starting with the first.
      if (index % 2 == 1) {
         // Double the value.
         total += value;
         // If the doubled value is more than 9, subtract 9 from the total.
         if (value * 2 > 9) total -= 9;
      }
   });

   // Return true if the number is a multiple of 10.
   // This is the equivalent of the program's 9 instructions between the loop and the JNE jump.
   if (total % 10 == 0) return true;
   // Otherwise return false.
   return false;
}
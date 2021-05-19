/*
BIG WARNING: THis script is just something I made for fun and nothing to do with the actual task.
*/

function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}
function randomFloat(min, max) {
   return Math.random() * (max - min) + min;
}

const confettiList = [];
class Confetti {
   constructor() {
      this.displayObj = document.createElement("div");
      this.displayObj.classList.add("confetti");
      this.displayObj.style.transform = "rotate(" + randomInt(0, 359) + "deg)";
      document.body.appendChild(this.displayObj);

      const colours = ["red", "blue", "yellow", "green", "#FF69B4"];
      this.displayObj.style.backgroundColor = colours[randomInt(0, colours.length)];

      this.left = randomFloat(10, 90);
      this.top = randomFloat(10, 100);
      this.xVel = randomFloat(-2, 2);
      this.yVel = randomFloat(-1, -2);
   }
   updateVisuals() {
      this.displayObj.style.left = this.left + "vw";
      this.displayObj.style.top = this.top + "vh";
   }
}

function createConfetti(confettiN) {
   for (let i = 0; i < confettiN; i++) {
      const newConfetti = new Confetti();
      confettiList.push(newConfetti);
   }
}
import "./style.css";

const app = document.getElementById("app");
const answer = document.getElementById("answer");
const guessBtn = document.getElementById("guess");
const revealBtn = document.getElementById("reveal");
const log = document.getElementById("log");
function generateNumbers(from = 0, to = 10) {
  const arr = [];

  function numberGenerator(arr) {
    if (arr.length >= 5) return;
    let newNumber = Math.floor(Math.random() * (to - from) + from);
    if (arr.indexOf(newNumber) < 0) {
      arr.push(newNumber);
    }
    numberGenerator(arr);
  }

  numberGenerator(arr);
  return arr;
}

let arr = [];
arr = generateNumbers(arr);
console.log(arr);

revealBtn.onclick = () => {
  app.innerHTML = arr.join(" ");
};
guessBtn.onclick = function guess() {
  const ansString = answer.value;
  const ans = ansString.toString(10).replace(/\D/g, "0").split("").map(Number);

  const count = { a: 0, b: 0 };

  for (let i = 0; i < ans.length; i++) {
    console.log(arr, +ans[i]);
    switch (arr.indexOf(+ans[i])) {
      case i:
        count.a++;
        break;
      case -1:
        break;
      default:
        count.b++;
        break;
    }
  }

  const l = Object.entries(count).map(([k, v]) => `${v}${k}`);

  log.innerHTML =
    `
    <li>${ansString}: ${l}</li>
  ` + log.innerHTML;
};

import Toastr from "toastr2";

import "toastr2/dist/toastr.min.css";

import "./style.css";

const app = document.getElementById("app");
const time = document.getElementById("time");
const guessed = document.getElementById("guessed");
const log = document.getElementById("log");

const toastr = new Toastr();
toastr.options.positionClass = "toast-top-center";

const texts = document.getElementsByClassName("text");
function formatGuess(ans) {
  return ans.padEnd(5, "_").split("").join(" ");
}

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;

  return (
    mins.toString().padStart(2, "0") + ":" + secs.toString().padStart(2, "0")
  );
}

let ans = "";
let curTime = Date.now();
let startTime = Date.now();
let elapsed = 0; //ms
let timerId = null;
function timerLoop() {
  curTime = Date.now();
  elapsed = curTime - startTime;
  time.innerHTML = msToTime(elapsed);
  timerId = requestAnimationFrame(timerLoop);
}
requestAnimationFrame(timerLoop);

function addGuess(el) {
  const num = el.textContent;
  el.parentNode.classList.add("disabled");
  ans += num;
  guessed.innerHTML = formatGuess(ans);

  if (ans.length >= 5) {
    for (let text of texts) {
      text.parentNode.classList.remove("disabled");
    }

    if (guess(ans)) {
      app.innerHTML = arr.join(" ");
      guessed.innerHTML = "r e s e t";
      cancelAnimationFrame(timerId);
      guessed.onclick = reset;
    } else {
      guessed.innerHTML = "_ _ _ _ _";
    }
    ans = "";
  }
}

for (let text of texts) {
  text.parentNode.onclick = () => addGuess(text);
}

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

app.onclick = () => {
  if (app.innerHTML.includes("*")) {
    app.innerHTML = arr.join(" ");
  } else {
    app.innerHTML = "* * * * *";
  }
};
function guess(ansString) {
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
    <li>${formatGuess(ansString)} : ${l}</li>
  ` + log.innerHTML;

  if (count.a === 5) {
    toastr.success(`${formatGuess(ansString)} : ${l}`);
    return true;
  }
  toastr.error(`${formatGuess(ansString)} : ${l}`);
  return false;
}

function reset() {
  arr = [];
  arr = generateNumbers(arr);
  app.innerHTML = "* * * * *";
  log.innerHTML = "";
  guessed.innerHTML = "_ _ _ _ _";
  guessed.onclick = null;
  startTime = Date.now();
  timerId = requestAnimationFrame(timerLoop);
}

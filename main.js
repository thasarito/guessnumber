import "./style.css";

const app = document.getElementById("app");
const guessed = document.getElementById("guessed");
const log = document.getElementById("log");

const texts = document.getElementsByClassName("text");
function formatGuess(ans) {
  return ans.padEnd(5, "_").split("").join(" ");
}
let ans = "";
function addGuess(el) {
  const num = el.textContent;
  el.parentNode.classList.add("disabled");
  ans += num;
  guessed.innerHTML = formatGuess(ans);

  if (ans.length === 5) {
    for (let text of texts) {
      text.parentNode.classList.remove("disabled");
    }
    guess(ans);
    guessed.innerHTML = "_ _ _ _ _";
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
  app.innerHTML = arr.join(" ");
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
}

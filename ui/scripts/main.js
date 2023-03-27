// const { invoke } = window.__TAURI__.tauri;

// These two approaches require you to use Vite or Webpack, because the whole
// idea of using "import" is something that's added to Javascript from bundlers
// and aren't part of the language itself
import { invoke }  from '@tauri-apps/api'
// import { invoke } from '../../node_modules/@tauri-apps/api'

let greetInputEl;
let greetMsgEl;

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document.querySelector("#greet-button").addEventListener("click", () => greet());

  first_line_txt = document.querySelector("#first-line");
  document.querySelector("#rf-button").addEventListener("click", () => read_file());

  addition_line = document.querySelector("#addition-line");
  document.querySelector("#add-button").addEventListener("click", () => add_in_rust());

  document.querySelector("#mfjs-button").addEventListener("click", () => iterate_number());
});

async function greet() {
  console.log("greeting");
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
}

//Read a file in rust
let first_line_txt;
async function read_file() {
  try {
    console.log('Reading a file in rust');
    first_line_txt.textContent = await invoke("read_file", {});
  } catch (error) {
    console.error('An error occurred while reading the file:', error);
    // handle the error here, e.g. display an error message to the user
  }
}

let addition_line;
async function add_in_rust() {
  try {
    console.log('Doing additon in Rust');
    addition_line.textContent = await invoke("perform_addition", { modifier: iterator });
  } catch (error) {
    console.error('An error occurred while doing math in rust:', error);
    // handle the error here, e.g. display an error message to the user
  }
}

let iterator = 0;
function iterate_number() {
  iterator = iterator+1;
}

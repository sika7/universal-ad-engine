import { Core } from "./lib/core";

// interface Window {
//
// }

const core = new Core();
core.main();

class HelloWorld extends HTMLElement {
  connectedCallback() {
    // this.textContent = "";

    const shadow = this.attachShadow({ mode: "closed" });
    shadow.innerHTML = `
    <style>
      p {
        text-align: center;
        font-weight: normal;
        padding: 1em;
        margin: 0 0 2em 0;
        background-color: #eee;
        border: 1px solid #666;
      }
    </style>`;
  }
}

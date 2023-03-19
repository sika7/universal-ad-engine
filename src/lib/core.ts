import {
  applyHtmlVariable,
  IUniversalAdTemplate,
} from "./universal-ad-template";

class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  render() {
    return `
<p>a</p>
<p>{{ name }}</p>
<p class="{{ name}}">テスト</p>
<p>{{ test() }}</p>
<p>{{name }}</p>
    `;
  }
}

export class Core {
  constructor() {}

  main() {
    // const test2 = {
    //   hoge: { fuga: [1, 2, 3], fuga2: 'a' },
    //   fuga: 9,
    //   piyo: "1",
    //   b: true,
    // };
    // console.log("test2", getProperty(test2, "b"));

    const test = new UniversalAdTemplate();
    console.log("test", applyHtmlVariable(test));
  }

  request() {}
}

// class HelloWorld extends HTMLElement {
//   connectedCallback() {
//     // this.textContent = "";
//
//     const shadow = this.attachShadow({ mode: "closed" });
//     shadow.innerHTML = `
//     <style>
//       p {
//         text-align: center;
//         font-weight: normal;
//         padding: 1em;
//         margin: 0 0 2em 0;
//         background-color: #eee;
//         border: 1px solid #666;
//       }
//     </style>
//           <p>テスト</p>
//
//     `;
//   }
// }
//
// const elm = document.querySelector('#app')!;
// customElements.define( 'hello-world', HelloWorld );
//

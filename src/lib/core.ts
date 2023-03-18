function variablesFormat(html: string) {
  html = html.replace(/\{\{[ 　]+/g, "{{");
  html = html.replace(/[ 　]+\}\}/g, "}}");
  return html;
}

function getVariables(html: string) {
  const findPattern = new RegExp(/\{\{(.+)\}\}/g);
  const replacePattern = new RegExp(/\{\{(.+)\}\}/);
  const data = html.match(findPattern);
  if (!data) return [];
  return data?.map((data) => data.match(replacePattern)![1]);
}

function replaceVariable(html: string, variables: string[]) {
  variables.map((data) => (html = html.replace("{{" + data + "}}", "hoge")));
  return html;
}

function applyHtmlVariable(html: string) {
  const _html = variablesFormat(html);
  const values = getVariables(_html);
  return replaceVariable(_html, values);
}

export class Core {
  constructor() {}

  main() {
    const html = `
<p>テスト</p>
<p>{{ name }}</p>
<p>テスト</p>
<p>{{ name }}</p>
<p>{{ name }}</p>
    `;
    console.log("test", applyHtmlVariable(html));
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

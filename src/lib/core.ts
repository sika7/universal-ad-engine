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

function getProperty(
  object: object | undefined,
  propertyPath: string,
  defaultValue?: any
) {
  if (!object) return defaultValue;

  let result: any = object;
  const propertyArray = propertyPath.split(".");
  for (let i = 0; i <= propertyArray.length - 1; i += 1) {
    if (propertyArray[i] === "") return defaultValue;

    if (typeof result[propertyArray[i]] === "undefined") return defaultValue;

    result = result[propertyArray[i]];
  }
  if (typeof result === "object") return result;
  if (typeof result === "function") return result;
  if (typeof result === "string") return result;
  if (typeof result === "number") return result;
  if (typeof result === "boolean") return result;
  return result;
}

function execValue(test: Test, propertyPath: string) {
  const func = getProperty(test, propertyPath.replace(/\(\)/g, ""), () => {});
  return func.call(test);
}

function replaceValue(test: Test, propertyPath: string) {
  if (propertyPath.match(/.*\(\)/)) return execValue(test, propertyPath);
  return getProperty(test, propertyPath, "");
}

function replaceData(html: string, variables: string[], test: Test) {
  variables.map(
    (data) =>
      (html = html.replace("{{" + data + "}}", replaceValue(test, data)))
  );
  return html;
}

function applyHtmlVariable(test: Test) {
  const html = test.html();

  const _html = variablesFormat(html);
  const values = getVariables(_html);
  return replaceData(_html, values, test);
}

class Test {
  constructor() {}

  name = "huga";

  test() {
    return "piyo";
  }

  html() {
    return `
<p>テスト</p>
<p>{{ name }}</p>
<p>テスト</p>
<p>{{ test() }}</p>
<p>{{ name }}</p>
    `;
  }

  css() {
    return "";
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

    const test = new Test();
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

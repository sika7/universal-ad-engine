import { UniversalAdTemplate } from "../template/default";
import { WebComponentWrapper } from "./web-components-wrapper";

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
    customElements.define("universal-ad-unit", WebComponentWrapper);

    const component = new WebComponentWrapper("#app", new UniversalAdTemplate());
  }

  request() {}
}

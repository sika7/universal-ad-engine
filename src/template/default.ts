import {
  getMethodList,
  IUniversalAdTemplate,
} from "../lib/universal-ad-template";

export class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  num = 0;

  test() {
    this.num++;
    console.log("hoge", getMethodList(this));
  }

  hoge() {
    alert("hoge");
  }

  style(): string {
    return `
p {
  color: blue;
}
    `;
  }

  render(): string {
    return `
<p>{{ num }}</p>
<p class="{{ name}}" [click]="test()">テスト</p>
    `;
  }
}

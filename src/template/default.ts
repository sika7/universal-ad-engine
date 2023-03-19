import { IUniversalAdTemplate } from "../lib/universal-ad-template";

export class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  test() {
    console.log('hoge');
  }

  render() {
    return `
<p>a</p>
<p class="{{ name}}" [click]="test()">テスト</p>
    `;
  }
}

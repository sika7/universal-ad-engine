import { IUniversalAdTemplate } from "../lib/universal-ad-template";

export class UniversalAdTemplate implements IUniversalAdTemplate {
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

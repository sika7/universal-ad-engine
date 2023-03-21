import { IPluginTemplate } from "../lib/template-manager";
import { IUniversalAdTemplate } from "../lib/universal-ad-template";

class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  style(): string {
    return `
    p {}
    `;
  }

  render(): string {
    return `
<div>
  <a href="https://github.com/sika7/universal-ad-engine" target="_blank">
    <img src="https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A" alt="テスト" />
  </a>
</div>
    `;
  }
}

export default function pluginUniversalAdTemplate(): IPluginTemplate {
  return { name: "test", template: () => new UniversalAdTemplate() };
}

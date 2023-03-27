import { IPluginTemplate } from "../lib/template-manager";
import { IUniversalAdTemplate } from "../lib/universal-ad-template";
import { TypeResponseBanner } from "../response/banner";

class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  url = "https://github.com/sika7/universal-ad-engine";
  imgSrc =
    "https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A";
  height = 300;
  width = 300;
  alt = "";

  style(): string {
    return `
    `;
  }

  update(response: TypeResponseBanner) {
    // ここでレスポンスデータをメンバ変数に与える
    this.url = response.url;
    this.imgSrc = response.img_src;
    this.height = response.height;
    this.width = response.width;
    if (response.alt) this.alt = response.alt;
  }

  render(): string {
    return `
<div>
  <a href="{{ url }}" target="_blank">
    <img src="{{ imgSrc }}" alt="{{ alt }}" width="{{ width }}" height="{{ height }}" />
  </a>
</div>
    `;
  }
}

export default function pluginUniversalAdTemplate(): IPluginTemplate {
  return { name: "test", template: () => new UniversalAdTemplate() };
}

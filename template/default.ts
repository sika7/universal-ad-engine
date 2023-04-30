import { RequestType } from "../lib/api";
import { IUniversalAdTemplate } from "../lib/template/main";
import { Plugin } from "../lib/template/manager";
import { bannerValidation, BannerResponse } from "../response/banner";
import * as style from "./default.css?inline";

class UniversalAdTemplate implements IUniversalAdTemplate {
  constructor() {}

  url = "https://github.com/sika7/universal-ad-engine";
  imgSrc =
    "https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A";
  height = 300;
  width = 300;
  alt = "";

  closeClass = "";

  style(): string {
    return style.default;
  }

  update(response: BannerResponse) {
    // ここでレスポンスデータをメンバ変数に与える
    this.url = response.url;
    this.imgSrc = response.img_src;
    this.height = response.height;
    this.width = response.width;
    if (response.alt) this.alt = response.alt;
  }

  click() {
    console.log("click");
    this.closeClass = "close";
  }

  render(): string {
    return `
<div class="{{ closeClass }}" [click]="click()" >
  <a>
    <img src="{{ imgSrc }}" alt="{{ alt }}" width="{{ width }}" height="{{ height }}" />
  </a>
</div>
    `;
  }
}

export default function pluginUniversalAdTemplate(
  url: string,
  type: RequestType
): Plugin {
  return {
    template: () => new UniversalAdTemplate(),
    api: {
      url: url,
      type: type,
      validation: bannerValidation,
    },
  };
}
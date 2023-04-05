import { RequestType } from "../lib/api";
import { IPluginTemplate } from "../lib/template-manager";
import { IUniversalAdTemplate } from "../lib/universal-ad-template";
import { TypeResponseBanner } from "../response/banner";
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

  update(response: TypeResponseBanner) {
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
): IPluginTemplate {
  return {
    name: "test",
    template: () => new UniversalAdTemplate(),
    api: {
      url: url,
      type: type,
      validation: {
        url: "string|url|https",
        img_src: "string|url|https",
        width: "number|integer",
        height: "number|integer",
      },
    },
  };
}

import { Template } from "template/main";
import { BannerResponse, bannerValidation } from "response/banner";
import { RequestType } from "api";
import { Plugin } from "template/plugin";

class BnnerTemplate implements Template {
  url = "https://github.com/sika7/universal-ad-engine";
  imgSrc =
    "https://placehold.jp/3d4070/ffffff/300x300.png?text=%E5%BA%83%E5%91%8A";
  height = 300;
  width = 300;
  alt = "";

  closeClass = "";

  style(): string {
    return `
      div {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 300px;
        margin: auto;
      }
      .close {
        display: none;
      }
    `;
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

export default function pluginBnner(url: string, type: RequestType): Plugin {
  return {
    template: () => new BnnerTemplate(),
    api: {
      url: url,
      type: type,
      validation: bannerValidation,
    },
  };
}

import { apiRequest } from "./api";
import { IUniversalAdApi } from "./core";
import { applyDom, setEvent } from "./dom";
import {
  executeMethod,
  IUniversalAdTemplate,
  generate,
} from "./universal-ad-template";

interface IWebComponentWrapper {
  id: string;
  api: IUniversalAdApi | undefined;
  render(): void;
}

let template: IUniversalAdTemplate | undefined;

let api: IUniversalAdApi | undefined;

export class WebComponentWrapper
  extends HTMLElement
  implements IWebComponentWrapper
{
  id: string;
  api: IUniversalAdApi | undefined;
  shadow: ShadowRoot;

  constructor(
    id: string,
    templateInstance: IUniversalAdTemplate,
    apiData: IUniversalAdApi | undefined
  ) {
    super();
    this.id = id;
    template = templateInstance;
    api = apiData;
    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);

    Object.freeze(this);
  }

  connectedCallback() {
    this.setAttribute("id", `ua-${this.id}`);
  }
  renderedCallback() {}

  pull() {
    if (!api) return;
    apiRequest(api.type, api.url, api?.data)
      .then((value: any) => {
        if (!template) return;
        template.update(value);
        this.render();
      })
      .catch(() => {
        // throw new Error("API request failed.");
      });
  }

  hide(second: number = 30) {
    this.style.display = "none";
    const limit = 180;
    if (second > limit) throw new Error("The duration to hide is too long.");
    setTimeout(() => {
      this.style.display = "block";
    }, 1000 * second);
  }

  render() {
    if (!template) return;
    this.shadow.innerHTML = generate(template);
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      if (!template) return;
      executeMethod(template, atter);
      this.render();
    });
  }
}

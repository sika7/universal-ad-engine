import { apiRequest } from "./api";
import { applyDom, setEvent } from "./dom";
import { IUniversalAdApi } from "./setting-manager";
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
    api: IUniversalAdApi | undefined
  ) {
    super();
    this.id = id;
    template = templateInstance;
    this.api = api;
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
    if (!this.api) return;
    apiRequest(this.api.type, this.api.url, this.api?.data)
      .then((value: any) => {
        if (!template) return;
        template.update(value);
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

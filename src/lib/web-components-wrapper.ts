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
  template: IUniversalAdTemplate;
  render(): void;
}

export class WebComponentWrapper
  extends HTMLElement
  implements IWebComponentWrapper
{
  id: string;
  template: IUniversalAdTemplate;
  api: IUniversalAdApi | undefined;
  shadow: ShadowRoot;

  constructor(
    id: string,
    template: IUniversalAdTemplate,
    api: IUniversalAdApi | undefined
  ) {
    super();
    this.id = id;
    this.template = template;
    this.api = api;
    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);
  }

  connectedCallback() {
    this.setAttribute("id", `ua-${this.id}`);
  }
  renderedCallback() {}

  pull() {
    if (!this.api) return;
    apiRequest(this.api.type, this.api.url, this.api?.data)
      .then((value: any) => {
        this.template.update(value);
      })
      .catch(() => {
        // throw new Error("API request failed.");
      });
  }

  render() {
    this.shadow.innerHTML = generate(this.template);
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      executeMethod(this.template, atter);
      this.render();
    });
  }
}

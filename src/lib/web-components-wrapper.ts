import { domRender } from "./render";
import {
  applyHtmlVariable,
  executeMethod,
  IUniversalAdTemplate,
  styleText,
} from "./universal-ad-template";

export class WebComponentWrapper extends HTMLElement {
  id: string;
  template: IUniversalAdTemplate;

  constructor(id: string, template: IUniversalAdTemplate) {
    super();
    this.id = id;
    this.template = template;
  }

  render() {
    const elm = document.querySelector(this.id)!;
    if (!elm) return;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this);
    domRender(elm, fragment);
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });

    const html = applyHtmlVariable(this.template);
    const style = styleText(this.template);

    shadow.innerHTML = `
    <style>
    ${style}
    </style>
    ${html}
    `;

    this.setClickEvent(shadow);
  }

  setEvent(shadow: ShadowRoot, atterName: string, event: string) {
    const clickElm = shadow.querySelectorAll("[" + atterName + "]");
    clickElm.forEach((data) => {
      const atter = data.getAttribute(atterName)!;
      data.addEventListener(event, () => {
        executeMethod(this.template, atter);
      });
      data.removeAttribute(atterName);
    });
  }

  setClickEvent(shadow: ShadowRoot) {
    this.setEvent(shadow, "c", "click");
  }
}

import {
  applyHtmlVariable,
  executeMethod,
  IUniversalAdTemplate,
} from "./universal-ad-template";

export class WebComponentWrapper extends HTMLElement {
  template: IUniversalAdTemplate;

  constructor(template: IUniversalAdTemplate) {
    super();
    this.template = template;
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "closed" });

    const html = applyHtmlVariable(this.template);

    shadow.innerHTML = `
    <style>
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

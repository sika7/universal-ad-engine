import { applyHtmlVariable, IUniversalAdTemplate } from "./universal-ad-template";

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
  }
}


import { domRender } from "./render";
import {
  applyHtmlVariable,
  executeMethod,
  IUniversalAdTemplate,
  styleText,
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
  shadow: ShadowRoot;

  constructor(id: string, template: IUniversalAdTemplate) {
    super();
    this.id = id;
    this.template = template;
    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    this.applyDom();
  }

  connectedCallback() {}
  renderedCallback() {}

  render() {
    const html = applyHtmlVariable(this.template);
    const style = styleText(this.template);

    this.shadow.innerHTML = `
      <style>
      ${style}
      </style>
      ${html}
    `;
    this.setClickEvent();
  }

  applyDom() {
    const elm = document.querySelector(this.id)!;
    if (!elm) return;
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this);
    domRender(elm, fragment);
  }

  setEvent(atterName: string, event: string) {
    const clickElm = this.shadow.querySelectorAll("[" + atterName + "]");
    clickElm.forEach((data) => {
      const atter = data.getAttribute(atterName)!;
      data.addEventListener(event, () => {
        executeMethod(this.template, atter);
        this.render();
      });
      data.removeAttribute(atterName);
    });
  }

  setClickEvent() {
    this.setEvent("c", "click");
  }
}

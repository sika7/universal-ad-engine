import { Parameter } from "../api";
import { applyDom, setEvent } from "./front/dom";
import { UniversalAdCore } from "../core";

export type WebComponentWrapperOption = {
  id: string;
  core: UniversalAdCore;
};

let core: UniversalAdCore | undefined;

export class WebComponentWrapper extends HTMLElement {
  id: string;
  shadow: ShadowRoot;

  constructor({ id, core }: WebComponentWrapperOption) {
    super();
    this.id = id;
    core = core;

    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);

    Object.freeze(this);
  }

  connectedCallback() {
    this.setAttribute("id", `ua-${this.id}`);
  }
  renderedCallback() {}

  pull(parameter: Parameter) {
    if (core) {
      core.pull(parameter);
    }
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
    if (!core) return;
    this.shadow.innerHTML = core.generate();
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, "c", "click", (atter: string) => {
      if (!core) return;
      core.executeMethod(atter);
      this.render();
    });
  }
}

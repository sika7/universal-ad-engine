import { Parameter } from "../api";
import { applyDom, setEvent } from "./front/dom";
import { UniversalAdCore } from "../core";
import { Common } from "../common";
import { ApiSetting } from "../template/plugin";

export type WebComponentWrapperOption = {
  id: string;
  core: UniversalAdCore;
  apiData: ApiSetting;
  common: Common;
};

let core: UniversalAdCore | undefined;
let api: ApiSetting | undefined;

export class WebComponentWrapper extends HTMLElement {
  id: string;
  shadow: ShadowRoot;
  common: Common;

  constructor({ id, core, apiData, common }: WebComponentWrapperOption) {
    super();
    this.id = id;
    core = core;
    api = apiData;

    this.shadow = this.attachShadow({ mode: "closed" });

    this.render();
    applyDom(this.id, this);

    this.common = common;

    Object.freeze(this);
  }

  connectedCallback() {
    this.setAttribute("id", `ua-${this.id}`);
  }
  renderedCallback() {}

  pull(parameter: Parameter) {
    if (core && api) {
      core.pull({
        url: api.url,
        type: api.type,
        parameter: parameter,
        validation: api.validation,
      });
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

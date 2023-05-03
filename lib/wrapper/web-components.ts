import { Parameter } from 'api';
import { UniversalAdCore } from 'core';
import { setEvent, applyDom } from 'wrapper/front/dom';

export type WebComponentWrapperOption = {
  id: string;
  core: UniversalAdCore;
};

let coreInstance: UniversalAdCore | undefined;

export function attachWebComponent(name: string) {
  if (!customElements.get(name)) {
    customElements.define(name, WebComponentWrapper);
  }
}

export class WebComponentWrapper extends HTMLElement {
  id: string;
  shadow: ShadowRoot;

  constructor({ id, core }: WebComponentWrapperOption) {
    super();
    this.id = id;
    coreInstance = core;

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.render();
    applyDom(this.id, this);

    Object.freeze(this);
  }

  connectedCallback() {
    this.setAttribute('id', `ua-${this.id}`);
  }

  // renderedCallback() {}

  async pull(parameter: Parameter) {
    if (!coreInstance) return;
    await coreInstance.pull(parameter);
  }

  hide(second = 30) {
    this.style.display = 'none';
    const limit = 180;
    if (second > limit) throw new Error('The duration to hide is too long.');
    setTimeout(() => {
      this.style.display = 'block';
    }, 1000 * second);
  }

  render() {
    if (!coreInstance) return;
    this.shadow.innerHTML = coreInstance.generate();
    this.setClickEvent();
  }

  setClickEvent() {
    setEvent(this.shadow, 'c', 'click', (atter: string) => {
      if (!coreInstance) return;
      coreInstance.executeMethod(atter);
      this.render();
    });
  }
}

function removeChildAll(targetElm: Element) {
  while (targetElm.firstChild) {
    targetElm.removeChild(targetElm.firstChild);
  }
}

export function domRender(targetElm: Element, fragment: DocumentFragment) {
  removeChildAll(targetElm);
  targetElm.appendChild(fragment);
}

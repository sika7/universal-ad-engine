function removeChildAll(targetElm: Element) {
  while (targetElm.firstChild) {
    targetElm.removeChild(targetElm.firstChild);
  }
}

function domRender(targetElm: Element, fragment: DocumentFragment) {
  removeChildAll(targetElm);
  targetElm.appendChild(fragment);
}

export function applyDom(id: string, addElm: HTMLElement) {
  const elm = document.querySelector(`#${id}`);
  if (!elm) return;
  const fragment = document.createDocumentFragment();
  fragment.appendChild(addElm);
  domRender(elm, fragment);
}

export function setEvent(
  node: DocumentFragment,
  atterName: string,
  event: string,
  callback: (atter: string) => void,
) {
  const clickElm = node.querySelectorAll("[" + atterName + "]");
  clickElm.forEach((data) => {
    const atter = data.getAttribute(atterName)!;
    data.addEventListener(event, function () {
      callback(atter);
    });
    data.removeAttribute(atterName);
  });
}

export class DomQuery<TElement extends HTMLElement = HTMLElement>
  implements ArrayLike<TElement> {
  [n: number]: TElement;
  length: number;

  constructor(selector: string) {
    const elems = document.querySelectorAll<TElement>(selector);

    this.length = elems.length;
    for (let i = 0; i < elems.length; ++i) {
      this[i] = elems[i];
    }
  }

  each(body: (index: number, element: TElement) => void) {
    for (let i = 0; i < this.length; ++i) {
      body(i, this[i]);
    }
  }
}

export const $ = function<TElement extends HTMLElement = HTMLElement>(
  selector: string
): DomQuery<TElement> {
  return new DomQuery(selector);
};

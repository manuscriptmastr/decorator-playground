import { render } from 'lit-html';
import { Reactive } from '../types';

type ReactiveElement = CustomElementConstructor & Reactive;

export const customElement =
  (tagName: string) =>
  (clazz: ReactiveElement, { addInitializer }: ClassDecoratorContext) => {
    const C = class extends clazz {
      constructor(...args: any[]) {
        super(...args);
        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        // @ts-ignore
        if (super.connectedCallback) {
          // @ts-ignore
          super.connectedCallback();
        }
        // @ts-ignore
        this.update();
      }

      update() {
        // @ts-ignore
        render(this.render(), this.shadowRoot);
      }
    };

    addInitializer(() => customElements.define(tagName, C));
  };

export const tap =
  <T, U>(fn: (value: any) => void) =>
  (
    { get, set }: ClassAccessorDecoratorTarget<T, U>,
    context: ClassAccessorDecoratorContext<T, U>
  ) => ({
    get(): U {
      // @ts-ignore
      const value = get.call(this);
      fn(value);
      return value;
    },
    set(value: U) {
      fn(value);
      // @ts-ignore
      set.call(this, value);
    },
  });

export const reactive = <T, U>(
  { get, set }: ClassAccessorDecoratorTarget<T, U>,
  context: ClassAccessorDecoratorContext<T, U>
) => ({
  get(): U {
    // @ts-ignore
    return get.call(this);
  },
  set(value: U) {
    // @ts-ignore
    set.call(this, value);
    // @ts-ignore
    this.update();
  },
});

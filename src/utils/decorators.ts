import { render } from 'lit-html';
import { Updateable } from '../types';

export const bound = <U extends (...args: any[]) => any>(
  method: U,
  { addInitializer, name }: ClassMethodDecoratorContext
) => {
  addInitializer(function () {
    // @ts-ignore
    this[name] = this[name].bind(this);
  });
};

export const customElement =
  (tagName: string) =>
  <T extends CustomElementConstructor>(
    clazz: T,
    { addInitializer }: ClassDecoratorContext<T>
  ) => {
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

export const reactive = <T, U>(
  { get, set }: ClassAccessorDecoratorTarget<T, U>,
  context: ClassAccessorDecoratorContext<T, U>
) => ({
  get(this: T & Updateable): U {
    return get.call(this);
  },
  set(this: T & Updateable, value: U) {
    set.call(this, value);
    this.update();
  },
});

export const tap =
  <T, U>(fn: (value: U) => void) =>
  (
    { get, set }: ClassAccessorDecoratorTarget<T, U>,
    context: ClassAccessorDecoratorContext<T, U>
  ) => ({
    get(this: T): U {
      const value = get.call(this);
      fn(value);
      return value;
    },
    set(this: T, value: U) {
      fn(value);
      set.call(this, value);
    },
  });

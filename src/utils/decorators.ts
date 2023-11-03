import { render } from 'lit-html';
import { Updateable } from '../types';

export const attribute = console.log;

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
    const C = class extends clazz implements Updateable {
      constructor(...args: any[]) {
        super(...args);
        this.attachShadow({ mode: 'open' });
      }

      connectedCallback() {
        this.update();
      }

      update() {
        // @ts-ignore
        render(this.render(), this.shadowRoot);
      }
    };
    addInitializer(() => customElements.define(tagName, C));
  };

export const persist =
  <T, U>(key: string, store = sessionStorage) =>
  (
    value: ClassAccessorDecoratorTarget<T, U>,
    context: ClassAccessorDecoratorContext<T, U>
  ): ClassAccessorDecoratorResult<T, U> => ({
    init(initialValue) {
      if (store.getItem(key) === null) {
        store.setItem(key, JSON.stringify(initialValue));
      }
      return initialValue;
    },
    get() {
      return JSON.parse(store.getItem(key)!);
    },
    set(value) {
      store.setItem(key, JSON.stringify(value));
    },
  });

export const reactive = <T, U>(
  { get, set }: ClassAccessorDecoratorTarget<T, U>,
  context: ClassAccessorDecoratorContext<T, U>
): ClassAccessorDecoratorResult<T, U> => ({
  get() {
    return get.call(this);
  },
  set(this: T & Updateable, value) {
    set.call(this, value);
    this.update();
  },
});

export const tap =
  <T, U>(fn: (value: U) => void) =>
  (
    { get, set }: ClassAccessorDecoratorTarget<T, U>,
    context: ClassAccessorDecoratorContext<T, U>
  ): ClassAccessorDecoratorResult<T, U> => ({
    get() {
      const value = get.call(this);
      fn(value);
      return value;
    },
    set(value) {
      fn(value);
      set.call(this, value);
    },
  });

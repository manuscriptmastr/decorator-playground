jest.mock('lit-html', () => ({
  render: jest.fn(),
}));
import { bound, customElement, persist } from './decorators';

describe('@bound', () => {
  it('binds a method', () => {
    class Jungle {
      property = 'banana';

      getBanana() {
        if (this === undefined) {
          throw new Error('Gorilla holding the banana and the entire jungle');
        } else {
          return this.property;
        }
      }
    }

    const { getBanana } = new Jungle();
    expect(() => getBanana()).toThrow(
      new Error('Gorilla holding the banana and the entire jungle')
    );

    class Jungle2 {
      property = 'banana';

      @bound
      getBanana() {
        if (this === undefined) {
          throw new Error('Gorilla holding the banana and the entire jungle');
        } else {
          return this.property;
        }
      }
    }

    const { getBanana: getBanana2 } = new Jungle2();
    expect(getBanana2()).toBe('banana');
  });
});

describe('@customElement(tagName)', () => {
  it('Registers a custom element with the browser', () => {
    expect(customElements.get('custom-element')).toBe(undefined);

    @customElement('custom-element')
    class CustomElement extends HTMLElement {}

    expect(customElements.get('custom-element')).toBeTruthy();
  });
});

describe('@persist(storageKey, storage?)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });

  it('initializes session storage with default property', () => {
    expect(sessionStorage.getItem('test-property')).toBeNull();

    class TestClass {
      @persist('test-property')
      accessor showDialog = false;
    }

    const myClass = new TestClass();
    expect(myClass.showDialog).toBe(false);
    expect(sessionStorage.getItem('test-property')).toBe('false');
  });

  it('initializes value from session storage', () => {
    sessionStorage.setItem('test-property', 'true');

    class TestClass {
      @persist('test-property')
      accessor showDialog = false;
    }

    const myClass = new TestClass();
    expect(myClass.showDialog).toBe(true);
    expect(sessionStorage.getItem('test-property')).toBe('true');
  });

  it('updates both property and session storage when property is updated and session storage was initialized by default property', () => {
    class TestClass {
      @persist('test-property')
      accessor showDialog = false;
    }

    const myClass = new TestClass();

    expect(myClass.showDialog).toBe(false);
    expect(sessionStorage.getItem('test-property')).toBe('false');

    myClass.showDialog = true;

    expect(myClass.showDialog).toBe(true);
    expect(sessionStorage.getItem('test-property')).toBe('true');
  });

  it('updates both property and session storage when property is updated and property was initialized by session storage', () => {
    sessionStorage.setItem('test-property', 'true');

    class TestClass {
      @persist('test-property')
      accessor showDialog = false;
    }

    const myClass = new TestClass();

    expect(myClass.showDialog).toBe(true);
    expect(sessionStorage.getItem('test-property')).toBe('true');

    myClass.showDialog = false;

    expect(myClass.showDialog).toBe(false);
    expect(sessionStorage.getItem('test-property')).toBe('false');
  });

  it('works with local storage', () => {
    localStorage.setItem('test-property', 'true');

    class TestClass {
      @persist('test-property', localStorage)
      accessor showDialog = false;
    }

    const myClass = new TestClass();

    expect(myClass.showDialog).toBe(true);
    expect(localStorage.getItem('test-property')).toBe('true');

    myClass.showDialog = false;

    expect(myClass.showDialog).toBe(false);
    expect(localStorage.getItem('test-property')).toBe('false');
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
});

jest.mock('lit-html', () => ({
  render: jest.fn(),
}));
import { bound } from './decorators';

describe('@bound', () => {
  sessionStorage.getItem('hello');
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

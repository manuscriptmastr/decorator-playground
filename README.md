# Decorator Playground

Playground to build and test JS decorators. Includes:

- Modern web-friendly compilation with Rollup
- TypeScript support
- Jest tests

## Wait, what are decorators?

JavaScript classes have historically been ugly to write and hard to refactor. (Already supported) additions like `class`, `#privateProperty`, and getters/setters have gone a long way toward making them more pleasant to build, but until now, creating complex classes has been clunky.

Decorators, unlike class inheritance or mixins, can decorate entire classes _or single properties_ with functionality. They are composable like functions/higher-order-functions and have a tiny surface area. Writing a decorator is:

- Trivial: Making a `@reactive` decorator that updates HTML when a property is updated takes less than 10 lines of code.
- Intuitive: Given a value and context, a decorator can simply return the original or decorated value.
- Reusable: A `@persist(storageKey, storage)` decorator can be used in any class on any method, getter, or setter.
- Easy to test: Decorators don't need fancy initialization or complex mock classes to be tested well.

## Resources

- [Babel Decorators Plugin](https://babeljs.io/docs/babel-plugin-proposal-decorators)
- [JavaScript Decorators Specification](https://github.com/tc39/proposal-decorators)
- [TypeScript Decorators Specification](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)

## Notes

Compiling JavaScript decorators to ES2022-friendly web is easy with the Babel plugin. However, TypeScript decorators carry lots of baggage that makes "just compiling" more difficult, and documentation for the May 2023 proposal and related types is sparse. To opt into the new specification:

- Use TypeScript 5 or higher
- Remove `experimentalDecorators` flag from `tsconfig.json`

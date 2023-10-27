# Decorator Playground

Playground to build and test JS decorators. Includes:

- Modern web-friendly compilation with Rollup
- TypeScript support
- Jest tests

## Resources

- [Babel Decorators Plugin](https://babeljs.io/docs/babel-plugin-proposal-decorators)
- [JavaScript Decorators Specification](https://github.com/tc39/proposal-decorators)
- [TypeScript Decorators Specification](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)

## Notes

Compiling JavaScript decorators to ES2022-friendly web is easy with the Babel plugin. However, TypeScript decorators carry lots of baggage that makes "just compiling" more difficult, and documentation for the May 2023 proposal and related types is sparse. To opt into the new specification:

- Use TypeScript 5 or higher
- Remove `experimentalDecorators` flag from `tsconfig.json`

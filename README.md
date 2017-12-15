# JSONAPI.ts
TypeScript ambient type information for compile-time validation of the [JSONAPI document specification](http://jsonapi.org/format/).

## How to use this

1. Install this package
```js
npm install --save-dev jsonapi.ts
```
2. Now, try to see if JSONAPI types are validated correctly
```ts
// ✅ This should be OK
let doc: JSONAPI.Document = {
  data: {
    type: 'articles',
    id: '1'
  }
};

// ⛔️ This should NOT be OK ( data, errors or meta property is required )
let doc: JSONAPI.Document = {
  jsonapi: { version: '1.0' }
};
```

## Copyright
&copy; 2017 [Mike North](https://github.com/mike-north), All Rights Reserved.

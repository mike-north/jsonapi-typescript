# JSON.ts <a href="https://travis-ci.org/mike-north/jsonapi.ts"  align='right'><img src="https://travis-ci.org/mike-north/jsonapi.ts.svg?branch=master"></a>
TypeScript ambient type information for compile-time validation of [JSON:API documents](https://www.jsonapi.org/).

## How to use this

1. Install this package
```js
npm install --save-dev jsonapi.ts
```

2. Include this module in your `tsconfig.json`'s `typeRoots`
```json
{
  "compilerOptions": {
    "typeRoots": [
      "node_modules/@types",
      "node_modules/json-typescript",
      "node_modules/jsonapi.ts"
    ]
  },
  "exclude": [
    "node_modules"
  ]
}
```

3. check to see if json types are validated correctly

```ts

// ✅ This should be OK
let doc: JSONAPI.Document = {
  data: {
    type: 'articles',
    id: '1'
  }
};

// ⛔️ This should NOT be OK ("result" is not a valid JSON:API top-level key)
let doc: JSONAPI.Document = {
  result: "Success!"
};

// ⛔️ This should NOT be OK ( empty Array is not a valid JSON:API document )
let doc: JSONAPI.Document = [];
```

## Copyright
&copy; 2017 [Mike North](https://github.com/mike-north), All Rights Reserved.

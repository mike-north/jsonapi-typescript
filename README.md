# JSONAPI-typescript

[![Build Status](https://travis-ci.org/mike-north/jsonapi-typescript.svg?branch=master)](https://travis-ci.org/mike-north/jsonapi-typescript)
[![Version](https://img.shields.io/npm/v/jsonapi-typescript.svg)](https://www.npmjs.com/package/jsonapi-typescript)

TypeScript type information for compile-time validation of [JSON:API documents](https://www.jsonapi.org/). Supports TS 2.3 and above.

## How to use this

1. Install this package
```js
npm install --save-dev jsonapi-typescript
```

2. Import this module
```ts
import * as JSONAPI from 'jsonapi-typescript';
```

3. check to see if json types are validated correctly

```ts
import * as JSONAPI from 'jsonapi-typescript';

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

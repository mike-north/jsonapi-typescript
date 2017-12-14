import { assert } from 'chai';
import { check } from 'typings-tester';
import { join } from 'path';

export function assertTsThrows(fileName: string, message?: string): void;
// export function assertTsThrows(fileName: string, errType: RegExp|Function);
export function assertTsThrows(fileName: string, errType: RegExp|Function, message?: string): void;
export function assertTsThrows(fileName: string, errType: Function, regExp: RegExp): void;
export function assertTsThrows(
	fileName: string,
  errType?: string | RegExp | Function,
  message?: string | RegExp
): void {
  return tsFileAssert(fileName, errType, message, assert.throws);
}
function tsFileAssert(
	fileName: string,
  errType?: string | RegExp | Function,
  message?: string | RegExp,
  assertMethod = assert.throws
): void {
  let cb = () => {
    check(
      [join(__dirname, fileName)],
      join(__dirname, '..', '..', 'tsconfig.json')
    );
  };
  if (!errType) {
    assertMethod(cb);
  } else if (typeof errType === 'string') {
    assertMethod(cb, errType);
  } else if (message && typeof message === 'string') {
    assertMethod(cb, errType, message);
  } else if (errType instanceof Function && message instanceof RegExp) {
    assertMethod(cb, errType, message);
  } else {
    assertMethod(cb, errType);
  }
}

export function assertTsNoThrows(
	fileName: string,
  message: string
): void {
  return tsFileAssert(fileName, undefined, message,  assert.doesNotThrow);
}

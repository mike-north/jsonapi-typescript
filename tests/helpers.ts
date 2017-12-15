import { assert } from 'chai';
import { check } from 'typings-tester';
import { join, dirname } from 'path';
import * as tsconfig from 'tsconfig';
export async function assertTsThrows(fileName: string, message?: string): Promise<void>;
export async function assertTsThrows(fileName: string, errType: RegExp|Function, message?: string): Promise<void>;
export async function assertTsThrows(fileName: string, errType: Function, regExp: RegExp): Promise<void>;
export async function assertTsThrows(
	fileName: string,
  errType?: string | RegExp | Function,
  message?: string | RegExp
): Promise<void> {
  return tsFileAssert(fileName, errType, message, assert.throws);
}
async function tsFileAssert(
	fileName: string,
  errType?: string | RegExp | Function,
  message?: string | RegExp,
  assertMethod = assert.throws
): Promise<void> {
  let typescriptConfig = await tsconfig.resolve(dirname(fileName));
  let cb = () => {
    check(
      [fileName],
      typescriptConfig as string
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

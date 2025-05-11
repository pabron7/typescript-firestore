const NOT_DEFINED = Symbol('notDefined'); // Unique marker to track "unset" state

/**
 * Methods added to all memoized functions.
 */
export type MemoExtension = {
  reset(): void;
  isInitialized(): boolean;            
  executionSuccessful(): boolean;
  inProgress(): boolean;
};

/**
 * Options that control memo behavior.
 */
export type MemoizeOptions<T> = {
  initResult?: T | typeof NOT_DEFINED;  
  resetAfterDone?: boolean;             // If true, resets cache after successful execution
};

/**
 * Type for memoized function with extensions.
 * - If `K` is undefined, it's a simple `() => T`.
 * - If `K` is defined, it returns a key-based memo function.
 */
export type Memo<T, K = undefined> =
  K extends undefined
    ? (() => T) & MemoExtension
    : ((key: K) => T) & MemoExtension;

/**
 * Internal unified signature for constructors with or without keys.
 * See https://en.wikipedia.org/wiki/Memoization
 */
type MemoGenericConstruct<T, K> = (key?: K) => T;

// Overload 1: basic memo
export function memoize<T>(construct: () => T, options?: MemoizeOptions<T>): Memo<T>;

// Overload 2: key-based memo
export function memoize<T, K>(construct: (key: K) => T, options?: MemoizeOptions<T>): Memo<T, K>;

/**
 * Main implementation.
 * - Memoizes a function's result.
 * - Tracks whether it’s executing, successful, or needs resetting.
 * - Supports reset after success and initial cached value.
 */
export function memoize<T, K = never>(
  construct: MemoGenericConstruct<T, K>,
  options?: MemoizeOptions<T>
): unknown {
  if (typeof construct !== 'function') {
    throw new Error(`Memoize construct function must be a function`);
  }

  const { resetAfterDone = false } = options || {};
  if (typeof resetAfterDone !== 'boolean') {
    throw new Error('Option "resetAfterDone" must be a boolean if provided');
  }

  let result: T | typeof NOT_DEFINED =
    options && 'initResult' in options && options.initResult !== undefined
      ? options.initResult
      : NOT_DEFINED;

  let success = false;
  let inProgress = false;

  // The memoized function
  const memo = (key?: K): T | typeof NOT_DEFINED => {
    if (result !== NOT_DEFINED) return result;

    success = false;
    inProgress = true;

    result = construct(key);

    // Handle async and sync separately
    if (!(result instanceof Promise)) {
      inProgress = false;
      success = true;

      if (resetAfterDone) {
        const tmp = result;
        result = NOT_DEFINED;
        return tmp;
      }

      return result;
    }

    // Async execution
    result
      .then(() => {
        inProgress = false;
        success = true;
        if (resetAfterDone) result = NOT_DEFINED;
      })
      .catch(() => {
        inProgress = false;
        success = false;
        result = NOT_DEFINED;
      });

    return result;
  };

  // Attach helper methods to memo
  memo.reset = (): void => {
    inProgress = false;
    success = false;
    result = NOT_DEFINED;
  };
  memo.isInitialized = (): boolean => result !== NOT_DEFINED;
  memo.wasLastExecutionSuccessful = (): boolean => success;
  memo.inProgress = (): boolean => inProgress;

  return memo;
}

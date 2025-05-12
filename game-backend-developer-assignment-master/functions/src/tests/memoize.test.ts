import { memoize } from '../utils/memoize';

describe('memoize()', () => {
  it('should only call the function once', () => {
    let callCount = 0;
    const fn = () => {
      callCount++;
      return 'result';
    };

    const memoizedFn = memoize(fn);

    expect(memoizedFn()).toBe('result');
    expect(memoizedFn()).toBe('result');
    expect(callCount).toBe(1); // Called only once
  });

  it('should reset the memoized result when reset is called', () => {
    let callCount = 0;
    const fn = () => {
      callCount++;
      return 'resettable';
    };

    const memoizedFn = memoize(fn);

    memoizedFn(); // 1st call
    memoizedFn(); // still cached
    memoizedFn.reset(); // clear cache
    memoizedFn(); // new call

    expect(callCount).toBe(2);
  });
});

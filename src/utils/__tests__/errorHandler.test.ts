import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleAsyncError, withRetry } from '../errorHandler';

describe('handleAsyncError', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('returns the resolved value without logging when the wrapped function succeeds', async () => {
    const asyncFn = vi.fn().mockResolvedValue('success');
    const wrapped = handleAsyncError(asyncFn);

    const result = await wrapped('param');

    expect(result).toBe('success');
    expect(asyncFn).toHaveBeenCalledWith('param');
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it('logs the error and returns null when the wrapped function rejects', async () => {
    const error = new Error('failure');
    const asyncFn = vi.fn().mockRejectedValue(error);
    const wrapped = handleAsyncError(asyncFn);

    const result = await wrapped();

    expect(result).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Async operation failed:', error);
  });
});

describe('withRetry', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('retries with exponential backoff until the operation succeeds', async () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    const operation = vi
      .fn()
      .mockRejectedValueOnce(new Error('first'))
      .mockRejectedValueOnce(new Error('second'))
      .mockResolvedValue('done');

    const promise = withRetry(operation, 3, 100);

    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toBe('done');
    expect(operation).toHaveBeenCalledTimes(3);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(2);
    expect(setTimeoutSpy.mock.calls.map(([, delay]) => delay)).toEqual([100, 200]);
  });

  it('propagates the last error when all retries fail', async () => {
    vi.useFakeTimers();
    const operation = vi.fn().mockRejectedValue(new Error('permanent failure'));

    const promise = withRetry(operation, 2, 50);

    await vi.runAllTimersAsync();
    await expect(promise).rejects.toThrow('permanent failure');
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it('short-circuits when the operation succeeds immediately', async () => {
    vi.useFakeTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    const operation = vi.fn().mockResolvedValue('instant');

    const result = await withRetry(operation, 4, 200);

    expect(result).toBe('instant');
    expect(operation).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
  });
});

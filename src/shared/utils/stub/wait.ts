/**
 * Wait helper method.
 * @returns resoved promise.
 */
export const wait = async <Data>(data?: Data, delay = 600): Promise<unknown> =>
    // eslint-disable-next-line no-promise-executor-return
    new Promise((resolve) => setTimeout(() => resolve(data), delay));

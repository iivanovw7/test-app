/*
    eslint-disable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
 */

export const toArray = <T>(value: T): T extends unknown[] ? T : [T] => {
    return Array.isArray(value) ? (value as any) : [value];
};
/*
    eslint-enable
    @typescript-eslint/no-unsafe-return,
    @typescript-eslint/no-explicit-any
 */

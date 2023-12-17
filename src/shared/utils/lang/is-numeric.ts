import { identical, pipe, not } from "ramda";

export const isNumeric = pipe(Number, identical(Number.NaN), not);

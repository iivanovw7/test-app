import { identical, not, pipe } from "ramda";

export const isNumeric = pipe(Number, identical(Number.NaN), not);

import { compose, values, length, filter, pipe, __ } from "ramda";
import { isNotNil, notEqual } from "ramda-adjunct";

const notEmptyValues = compose(values, filter(isNotNil));
const notZero = notEqual(0);

export const hasValues = pipe(notEmptyValues, length, notZero);

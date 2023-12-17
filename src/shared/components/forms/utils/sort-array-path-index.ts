import type { FieldArrayPath, FieldValues, FieldPath } from "#/forms";

import { getPathIndex } from ".";

export const sortArrayPathIndex = <TFieldValues extends FieldValues>(
    name: FieldArrayPath<TFieldValues>,
): ((
    pathA: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    pathB: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
) => number) => {
    return (
        pathA: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
        pathB: FieldArrayPath<TFieldValues> | FieldPath<TFieldValues>,
    ) => getPathIndex(name, pathA) - getPathIndex(name, pathB);
};

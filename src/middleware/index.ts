import { sequence } from "astro/middleware";

import { authorize } from "./authorize";
import { validation } from "./validation";

export const onRequest = sequence(authorize, validation);

import { sequence } from "astro/middleware";

import { validation } from "./validation";
import { authorize } from "./authorize";

export const onRequest = sequence(authorize, validation);

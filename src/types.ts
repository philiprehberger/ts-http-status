import type { Status } from "./codes.js";

export type StatusCode = (typeof Status)[keyof typeof Status];

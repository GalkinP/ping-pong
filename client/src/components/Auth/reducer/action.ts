import type{ User } from "../../User/type";

export type Action = {type: "auth/auth", payload: User} | {type: 'auth/userCheck', payload: User} | {type: 'auth/logout'};
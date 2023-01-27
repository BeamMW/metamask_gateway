import * as Router from "koa-router";

import { swagger } from "./swagger";
import { getAliveHandler } from "../controllers";

const router = new Router({ prefix: "/api/v1" });

router.get("/swagger.json", swagger).get("/alive", (ctx) => getAliveHandler(ctx));

export default router;

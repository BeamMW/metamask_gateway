import * as http from "http";

import * as Koa from "koa";
import { koaSwagger } from "koa2-swagger-ui";
import * as Sentry from "@sentry/node";
import * as Router from "koa-router";

import config from "./config";
import middlewares from "./middlewares";
import router from "./routes";
import { ENVIRONMENT } from "./shared/constants";
import { getAliveHandler } from "./controllers";
import { swagger } from "./routes/swagger";

const { host, port, server_url, sentry_url, env } = config;

const app: Koa = new Koa();

app.use(middlewares());

app.use(router.routes());

app.use(
  koaSwagger({
    routePrefix: "/swagger", // host at /swagger instead of default /docs
    swaggerOptions: {
      url:
        env === ENVIRONMENT.development
          ? `http://${host}:${port}/api/v1/swagger.json`
          : `${server_url}/api/v1/swagger.json`,
    },
  }),
);
// Middleware

if ([ENVIRONMENT.production, ENVIRONMENT.stage, ENVIRONMENT.qa].includes(env)) {
  Sentry.init({ dsn: sentry_url });
}
// Application error logging.
app.on("error", (err, ctx) => {
  if (env !== ENVIRONMENT.test) {
    console.error(err);
  }
  if ([ENVIRONMENT.production, ENVIRONMENT.stage, ENVIRONMENT.qa].includes(env)) {
    Sentry.withScope((scope) => {
      scope.addEventProcessor((event) => {
        return Sentry.Handlers.parseRequest(event, ctx.request);
      });
      Sentry.captureException(err);
    });
  }
});

const server = http.createServer(app.callback());

server.listen(port, host, () => {
  console.log(`listening on http://${host}:${port}`);
});

export default {
  app,
};

export { app };

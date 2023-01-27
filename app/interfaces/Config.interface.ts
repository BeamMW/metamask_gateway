import { ENVIRONMENT } from "../shared/constants";

export interface ConfigInterface {
  env: ENVIRONMENT;
  host: string;
  port: number;
  server_url: string;
  frontend_url: string;
  sentry_url: string;
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
  };
  postmark: {
    token: string;
    from: string;
  };
  jwt_secret: string;
}

import express, { Application, RequestHandler, Router } from 'express';
import bodyParser from 'body-parser';
import ProjectRouterFactoryV2 from './pearson/PearsonRouterFactory';
import JokesRouterFactory from './jokes-api/JokesRouterFactory';
import PearsonRouterFactory from './pearson/PearsonRouterFactory';
import dotenv from 'dotenv';

export default class AppFactory {
  private static createRouters(): Router[] {
    return [ProjectRouterFactoryV2.create(), JokesRouterFactory.create(), PearsonRouterFactory.create()];
  }

  private static createMiddleware(): RequestHandler[] {
    return [bodyParser.json()];
  }

  public static create(): Application {
    const app = express();

    app.disable('x-powered-by');

    dotenv.config();
    AppFactory.createMiddleware().forEach((middleware): void => {
      app.use(middleware);
    });

    AppFactory.createRouters().forEach((router): void => {
      app.use('', router);
    });

    return app;
  }
}

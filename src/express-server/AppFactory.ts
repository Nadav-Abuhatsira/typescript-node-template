import express, { Application, RequestHandler, Router } from 'express';
import bodyParser from 'body-parser';
import ProjectRouterFactoryV2 from './exmple-api/ExampleRouterFactory';
import JokesRouterFactory from './jokes-api/JokesRouterFactory';

export default class AppFactory {
  private static createRouters(): Router[] {
    return [ProjectRouterFactoryV2.create(), JokesRouterFactory.create()];
  }

  private static createMiddleware(): RequestHandler[] {
    return [bodyParser.json()];
  }

  public static create(): Application {
    const app = express();

    app.disable('x-powered-by');

    AppFactory.createMiddleware().forEach((middleware): void => {
      app.use(middleware);
    });

    AppFactory.createRouters().forEach((router): void => {
      app.use('', router);
    });

    return app;
  }
}

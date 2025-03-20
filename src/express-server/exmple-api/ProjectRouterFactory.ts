import { Request, Response, Router } from 'express';
import SayHi from './endpoints/say-hi/SayHi';

export default class ProjectRouterFactory {
  public static create(): Router {
    const router = Router();

    router.get(`/example-api/say-hi`, async (request: Request, response: Response) => {
      return new SayHi(request, response).getResponse();
    });
    return router;
  }
}

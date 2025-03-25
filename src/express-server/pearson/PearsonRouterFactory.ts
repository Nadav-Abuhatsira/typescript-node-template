import { Request, Response, Router } from 'express';
import GetPlaylist from './endpoints/get-playlist/GetPlaylist';

export default class PearsonRouterFactory {
  public static create(): Router {
    const router = Router();

    router.get(`/pearson/get-playlist`, async (request: Request, response: Response) => {
      return new GetPlaylist(request, response).getResponse();
    });
    return router;
  }
}

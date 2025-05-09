import { Request, Response, Router } from 'express';
import GetAllJokes from './endpoints/get-all-jokes/GetAllJokes';
import AddJoke from './endpoints/add-joke/AddJoke';
import DeleteJoke from './endpoints/delete-joke/DeleteJoke';

export default class JokesRouterFactory {
  public static create(): Router {
    const router = Router();

    router.get(`/jokes-api/get-all`, async (request: Request, response: Response) => {
      return new GetAllJokes(request, response).getResponse();
    });

    router.post(`/jokes-api/add-joke`, async (request: Request, response: Response) => {
      return new AddJoke(request, response).getResponse();
    });

    router.delete(`/jokes-api/delete-joke/:jokeId`, async (request: Request, response: Response) => {
      return new DeleteJoke(request, response).getResponse();
    });
    return router;
  }
}

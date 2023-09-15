import { Request, Response, NextFunction } from 'express';
import { controller, get, use } from './decorators';

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not permited!');
}

@controller('')
export class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`<div>
    <h2>You are logged in!</h2>
    <a href="/auth/logout">Logout</a>
    </div>
    `);
    } else {
      res.send(`<div>
    <h2>Please log in</h2>
    <a href="/auth/login">Login</a>
    </div>
    `);
    }
    res.send(`
  <div>
  <h1>Home</div>
  </div>`);
  }
  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send(`
    <div>
    <h2>Welcome to this place</h2>
    <a href="/auth/logout">Logout</a>
    </div>
    `);
  }
}

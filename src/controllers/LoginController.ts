import { NextFunction, Request, Response } from 'express';
import { get, post, controller, use, bodyValidator } from './decorators';

@controller('/auth')
export class LoginController {
  //Need to ensure that a decorator can only be useed on a function that takes a req and res argument
  // @get('/')
  // add(a: number, b: number): number {
  //   return a + b;
  // }

  @get('/login')
  getLogin(req: Request, res: Response): void {
    res.send(`
    <form method="post">
    <div>
      <label>Email</label>
      <input name="email" />
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password" />
    </div>
    <button type="submit">Submit</button>
    </form>
    `);
  }
  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (
      email &&
      password &&
      email === 'mail@mail.com' &&
      password === 'password'
    ) {
      req.session = { loggedIn: true };
      res.redirect('/');
    } else {
      res.send('invalid email or password');
    }
  }
  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}

// Object.getOwnPropertyNames(target.prototype).forEach((key) => {
//   const routeHandler = target.prototype[key];
//   const path = Reflect.getMetadata('path', target.prototype, key);
// });

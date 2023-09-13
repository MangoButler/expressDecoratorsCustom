import { Router, Request, Response, NextFunction } from 'express';

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
} //using an extended interface to ensure better typing on the request object

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }
  res.status(403);
  res.send('Not permited!');
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`<div>
    <h2>You are logged in!</h2>
    <a href="/logout">Logout</a>
    </div>
    `);
  } else {
    res.send(`<div>
    <h2>Please log in</h2>
    <a href="/login">Login</a>
    </div>
    `);
  }
  res.send(`
  <div>
  <h1>Home</div>
  </div>`);
});

router.get('/login', (req: Request, res: Response) => {
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
});

router.post('/login', (req: RequestWithBody, res: Response) => {
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
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
  res.send(`
  <div>
  <h2>Welcome to this place</h2>
  <a href="/logout">Logout</a>
  </div>
  `);
});

export { router };

//Typescript and express are hard to put together, as typescript is there to check the different properties on the code and show errors if there is anything missing, however the concept of Middleware in express (adding on to objects) is written in JS so typescript has difficulties understanding what is going on
//the type def files dont always tell the whole story sometimes even the wrong story

class LoginController {
  getLogin(req: Request, res: Response): void {
    res.send('form');
  }
}

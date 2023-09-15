import express, { Response, Request } from 'express';

import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';
import { AppRouter } from './AppRouter';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['something'] }));
app.use(AppRouter.getInstance());

app.listen(8000, () => {
  console.log('listening on port 8000');
});

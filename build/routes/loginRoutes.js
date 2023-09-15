"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
function requireAuth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permited!');
}
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.send(`<div>
    <h2>You are logged in!</h2>
    <a href="/logout">Logout</a>
    </div>
    `);
    }
    else {
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
router.get('/logout', (req, res) => {
    req.session = undefined;
    res.redirect('/');
});
router.get('/protected', requireAuth, (req, res) => {
    res.send(`
  <div>
  <h2>Welcome to this place</h2>
  <a href="/logout">Logout</a>
  </div>
  `);
});
//Typescript and express are hard to put together, as typescript is there to check the different properties on the code and show errors if there is anything missing, however the concept of Middleware in express (adding on to objects) is written in JS so typescript has difficulties understanding what is going on
//the type def files dont always tell the whole story sometimes even the wrong story

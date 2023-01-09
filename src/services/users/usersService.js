const app = require('../../server')
const users = require('../../models/users')

app.get("/users", function (req, res) {
  const data = new users({
    username: '1',
    pass: '1',
  });
  data.save((err) => {
    if (err) {
      res.redirect("/error");
    } else {
      res.redirect("/thank-you");
    }
  });
});
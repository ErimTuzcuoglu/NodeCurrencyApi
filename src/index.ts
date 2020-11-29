import express from "express";
import envConfig from "./config/env/index";
import routes from "./api/routes";

const app: express.Application = express();

app.get("/", (req, res, next) => {
  res.send(
    '<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/862/049/57a.jpg"></img'
  );
});
app.use(routes);

app.listen(envConfig.port);

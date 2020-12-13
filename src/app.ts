import "reflect-metadata";

import { Container } from "typedi";
import { createExpressServer, useContainer } from "routing-controllers";

import controllers from "./api/controllers";
import "./service";
import envConfig from "./config/env/index";

useContainer(Container);

createExpressServer({
  routePrefix: "/api",
  controllers: controllers,
}).listen(envConfig.port);

// app.get("/", (req, res, next) => {
//   res.send(
//     '<img src="https://i.kym-cdn.com/photos/images/newsfeed/001/862/049/57a.jpg"></img'
//   );
// });
// app.use(routes);

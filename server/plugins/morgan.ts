import morgan from "morgan";
import chalk from "chalk";
import dayjs from "dayjs";
import { createStream } from "rotating-file-stream";

export default defineNitroPlugin((plugin) => {
  // Create a rotating write stream
  const accessLogStream = createStream("access.json", {
    interval: "1d", // rotate daily
    path: "./logs",
  });
  // Define output for file logger
  const fileLogger = morgan(
    '{ "date": ":date[iso]", "method": ":method", "endpoint": ":url", "remote-address": ":remote-addr", "status": :status, "total-time": :total-time, "user-agent": ":user-agent" },',
    { stream: accessLogStream },
  );
  // Define output for console logger
  const consoleLogger = morgan((tokens, req, res) => {
    const status = Number(tokens.status(req, res));
    const date = dayjs(tokens.date(req, res, "iso")).format("MMM D YYYY h:mm:ss A");
    return [
      chalk.green(`[${date}]`),
      chalk.bold(chalk.yellow(tokens.method(req, res))),
      chalk.yellow(tokens.url(req, res)),
      status >= 400 ? chalk.red(status) : chalk.green(status),
      tokens["total-time"](req, res),
      "ms",
      chalk.gray(tokens["user-agent"](req, res)),
    ].join(" ");
  });
  // Log all requests to the console
  plugin.hooks.hook("request", fromNodeMiddleware(consoleLogger));
  // Log all requests to a file
  plugin.hooks.hook("request", fromNodeMiddleware(fileLogger));
});

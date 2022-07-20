import chalk from "chalk";

interface ILog {
  error: (...data: string[]) => void;
  log: (...data: string[]) => void;
  success: (...data: string[]) => void;
  throw: (...data: string[]) => never;
  verbose: (...data: string[]) => void;
  warn: (...data: string[]) => void;
}
export default (scope?: string) =>
  (emoji?: string): ILog => {
    function _(
      emoji: string = "ℹ️",
      data: string[],
      chalkInstance: import("chalk").ChalkInstance = chalk
    ) {
      console.log(
        chalkInstance(
          `${Intl.DateTimeFormat(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }).format(Date.now())} ${emoji} ` +
            (scope ? `[${scope}] ` : "") +
            data.join(" ")
        )
      );
    }

    return {
      error: (...data) => _(emoji || "🚫", data, chalk.red),
      log: (...data) => _(emoji || "ℹ", data),
      success: (...data) => _(emoji || "✔", data, chalk.greenBright),
      throw: (...data) => {
        _(emoji || "🚫", data, chalk.red.inverse);
        throw "";
      },
      verbose: (...data) =>
        process.env.NODE_ENV === "production"
          ? undefined
          : _(emoji || "ℹ", data, chalk.rgb(127, 127, 127)),
      warn: (...data) => _(emoji || "⚠", data, chalk.yellow)
    };
  };

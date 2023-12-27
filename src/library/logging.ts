import chalk from "chalk";

export default class Logger {
    static info(message: any) {
        console.log(chalk.blue(`[${new Date().toLocaleString()}] [info]`), typeof message === "string" ? chalk.blue(message) : message);
    }
    static warn(message: any) {
        console.log(chalk.yellow(`[${new Date().toLocaleString()}] [warn]`), typeof message === "string" ? chalk.blue(message) : message);
    }
    static error(message: any) {
        console.log(chalk.red(`[${new Date().toLocaleString()}] [error]`), typeof message === "string" ? chalk.blue(message) : message);
    }
}
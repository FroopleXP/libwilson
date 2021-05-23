import chalk from "chalk";
import ILogger from "../interfaces/ILogger";

class Logger implements ILogger {

    private caller: string;
    private isDebug: boolean;

    constructor(caller: string, debug: boolean) {
        this.caller = this.formatCallerString(caller);
        this.isDebug = debug;
    }

    private formatCallerString(caller: string): string {
        return caller.split(" ").map((part) => {
            const lower: string = part.toLocaleLowerCase();
            return part.charAt(0).toLocaleUpperCase() + lower.slice(1);
        }).join("")
    }

    debug(message: string): void {
        if (this.isDebug) {
            console.log(chalk.yellow.bold(`[${this.caller}]::Debug`), message);
        }
    }

    error(message: string): void {
        if (this.isDebug) {
            console.error(chalk.red.bold(`[${this.caller}]::Error`), message);
        }
    }

}

export default Logger;
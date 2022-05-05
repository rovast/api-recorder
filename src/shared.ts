import fs from "fs"
import moment from 'moment'
import chalk from "chalk"

const log = console.log
const now = (): string => moment().format('YYYY-MM-DD HH:mm:ss')

export function INFO(msg: string): void {
    log(now() + '[INFO] ' + msg)
}

export function SUCCESS(msg: string): void {
    log(chalk.green(now() + '[SUCCESS] ' + msg))
}

export function WARN(msg: string): void {
    log(chalk.yellow(now() + '[WARN] ' + msg))
}

export function ERROR(msg: string): void {
    log(chalk.red(now() + '[ERR] ' + msg))
}

export function FLASH(msg: string): void {
    log(chalk.bgGreenBright(now() + ' ' + msg))
}

export async function waitFile(filename: string): Promise<any> {
    return new Promise<void>(async (resolve, reject) => {
        if (!fs.existsSync(filename)) {
            await delay(3000);
            await waitFile(filename);
            resolve();
        } else {
            resolve();
        }
    })
}

export function delay(time: number): Promise<any> {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

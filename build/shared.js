"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.waitFile = exports.FLASH = exports.ERROR = exports.WARN = exports.SUCCESS = exports.INFO = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
const now = () => (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
function INFO(msg) {
    log(now() + '[INFO] ' + msg);
}
exports.INFO = INFO;
function SUCCESS(msg) {
    log(chalk_1.default.green(now() + '[SUCCESS] ' + msg));
}
exports.SUCCESS = SUCCESS;
function WARN(msg) {
    log(chalk_1.default.yellow(now() + '[WARN] ' + msg));
}
exports.WARN = WARN;
function ERROR(msg) {
    log(chalk_1.default.red(now() + '[ERR] ' + msg));
}
exports.ERROR = ERROR;
function FLASH(msg) {
    log(chalk_1.default.bgGreenBright(now() + ' ' + msg));
}
exports.FLASH = FLASH;
function waitFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!fs_1.default.existsSync(filename)) {
                yield delay(3000);
                yield waitFile(filename);
                resolve();
            }
            else {
                resolve();
            }
        }));
    });
}
exports.waitFile = waitFile;
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
exports.delay = delay;

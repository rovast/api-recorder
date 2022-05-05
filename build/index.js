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
const puppeteer_core_1 = __importDefault(require("puppeteer-core"));
const shared_1 = require("./shared");
const url_1 = __importDefault(require("url"));
const fs_1 = __importDefault(require("fs"));
const commander_1 = require("commander");
let Config;
// @ts-ignore
const PostmanCollection = {
    info: {
        name: "OpenMSP",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    // @ts-ignore
    item: []
};
function setupConfiguration() {
    const program = new commander_1.Command();
    program
        .description('A tool for record your api')
        .option('-n, --name <name>', 'collection name', 'record-api')
        .option('-o, --output <output_file>', 'output json file path', 'postman-collection.json')
        .option('-b, --browser <execute_path>', 'browser execute path', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
        .option('-m, --match <regex>', 'match the api path', '/api/');
    program.parse(process.argv);
    Config = program.opts();
}
function launchAPP() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.INFO)('Launch chrome...');
        const browser = yield puppeteer_core_1.default.launch({
            executablePath: Config.browser,
            headless: false,
            userDataDir: './user-data',
            defaultViewport: { width: 1366, height: 768 }
        });
        (0, shared_1.INFO)('Open new page');
        const page = yield browser.newPage();
        return { browser, page };
    });
}
function headerObjToKV(headers) {
    const arr = [];
    Object.keys(headers).forEach(key => {
        arr.push({
            key,
            value: headers[key]
        });
    });
    return arr;
}
function listenBrowserEvents(browser) {
    // page close event or browser close event
    browser.on('targetdestroyed', (_) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.ERROR)('Page close, write postman collection to file');
        yield fs_1.default.writeFileSync(Config.output, JSON.stringify(PostmanCollection), { flag: 'w' });
        (0, shared_1.FLASH)('EXIT process');
        process.exit(0);
    }));
}
function listenPageEvents(page) {
    page.on('response', (response) => __awaiter(this, void 0, void 0, function* () {
        const url = response.request().url();
        if (!url.includes(Config.match))
            return;
        const urlObj = url_1.default.parse(url);
        const pathname = urlObj.pathname || ' ';
        const pathArr = pathname === null || pathname === void 0 ? void 0 : pathname.split('/');
        pathArr === null || pathArr === void 0 ? void 0 : pathArr.shift();
        const request = {
            method: response.request().method(),
            header: headerObjToKV(response.request().headers()),
            url: {
                raw: pathname,
                host: urlObj.hostname,
                path: pathArr
            }
        };
        PostmanCollection.item.push({
            name: pathname,
            // @ts-ignore
            request,
            response: [
                {
                    name: 'success',
                    // @ts-ignore
                    originalRequest: request,
                    // @ts-ignore
                    header: headerObjToKV(response.request().headers()),
                    status: response.statusText(),
                    code: response.status(),
                    // @ts-ignore
                    body: yield response.text()
                }
            ]
        });
    }));
}
;
(() => __awaiter(void 0, void 0, void 0, function* () {
    setupConfiguration();
    const { browser, page } = yield launchAPP();
    listenBrowserEvents(browser);
    listenPageEvents(page);
}))();

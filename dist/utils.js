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
exports.readData = readData;
exports.writeData = writeData;
const promises_1 = __importDefault(require("fs/promises"));
function readData(filepath_1) {
    return __awaiter(this, arguments, void 0, function* (filepath, isParsed = false) {
        if (!filepath)
            return '';
        const data = yield promises_1.default.readFile(filepath, 'utf-8');
        return isParsed ? JSON.parse(data) : data;
    });
}
// export const readData = (filePath: string, isParsed: boolean = false) => {
//     if (!fs.exists(fullPath)) {
//         fs.writeFile(fullPath, isParsed ? '[]' : '');
//     }
//     const data = fs.readFileSync(fullPath, 'utf-8');
//     return isJson ? JSON.parse(data) : data;
// };
function writeData(filepath, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(filepath, JSON.stringify(data));
    });
}

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
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
// const dataPath = path.join(__dirname, 'data.json');
// console.log(dataPath, 'dataPath');
app.use(express_1.default.json());
app.get('/expenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, utils_1.readData)('./data.json', true);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
    }
}));
app.get('/expenses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id) {
            res.status(404).json({ message: 'Expense not found' });
        }
        const data = yield (0, utils_1.readData)('./data.json', true);
        const filteredData = data.find(el => el.id === Number(id));
        res.status(200).json(filteredData);
    }
    catch (error) {
        console.log(error);
    }
}));
app.post('/expenses/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = yield (0, utils_1.readData)('./data.json', true);
        const { name, price } = req.body;
        const lastId = ((_a = data[data.length - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0;
        const expense = {
            name,
            price,
            id: lastId + 1,
            date: new Date().toISOString()
        };
        data.push(expense);
        yield (0, utils_1.writeData)('./data.json', data);
        res.status(200).json(data);
    }
    catch (error) {
        console.log(error);
    }
}));
app.delete('/expenses/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, utils_1.readData)('./data.json', true);
        const index = data.findIndex((el) => el.id === Number(id));
        if (index !== -1) {
            const deletedExpense = data.splice(index, 1);
            yield (0, utils_1.writeData)('./data.json', data);
            res.status(200).json({ message: deletedExpense });
        }
        else {
            res.status(404).json({ message: 'Expense not found' });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
app.put('/expenses/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, utils_1.readData)('./data.json', true);
        const { id } = req.params;
        const { name, price } = req.body;
        const index = data.findIndex(el => el.id === Number(id));
        if (index === -1)
            res.status(404).json({ message: 'Expense not found' });
        data[index] = Object.assign(Object.assign({}, data[index]), { name: name ? name : data[index].name, price: price ? price : data[index].price, status: { 'last update': new Date().toDateString() } });
        yield (0, utils_1.writeData)('./data.json', data);
        res.status(200).json({ success: true, message: { updated: data[index] } });
    }
    catch (error) {
        console.log(error);
    }
}));
app.listen(3003, () => {
    console.log('Server is running on port http://localhost:3003');
});

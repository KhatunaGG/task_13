import express, { Express, Request, Response } from 'express';
import path from 'path';
import { readData, writeData } from './utils';

const app: Express = express();

// const dataPath = path.join(__dirname, 'data.json');
// console.log(dataPath, 'dataPath');

app.use(express.json());

type ExpensesType = {
    name: string;
    price: number;
    id: number;
    date: string;
    status?: { 'last update': string };
};


app.get('/expenses', async (req: Request, res: Response) => {
    try {
        const data = await readData('./data.json', true);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
});

app.get('/expenses/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        console.log(id)
        if(!id) {
            res.status(404).json({ message: 'Expense not found' })
        }
        const data: ExpensesType[] = await readData('./data.json', true)
        const filteredData = data.find(el => el.id === Number(id))
        res.status(200).json(filteredData)
    } catch (error) {
        console.log(error)
    }

})

app.post('/expenses/create', async (req: Request, res: Response) => {
    try {
        const data: ExpensesType[] = await readData('./data.json', true);
        const { name, price } = req.body;
        const lastId = data[data.length - 1]?.id || 0;
        const expense: ExpensesType = {
            name,
            price,
            id: lastId + 1,
            date: new Date().toISOString()
        };
        data.push(expense);
        await writeData('./data.json', data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
});

app.delete('/expenses/delete/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data: ExpensesType[] = await readData('./data.json', true);
        const index = data.findIndex((el: ExpensesType) => el.id === Number(id));

        if (index !== -1) {
            const deletedExpense = data.splice(index, 1);
            await writeData('./data.json', data);
            res.status(200).json({ message: deletedExpense });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        console.log(error)
    }
});

app.put('/expenses/update/:id', async (req: Request, res: Response) => {
    try {
        const data: ExpensesType[] = await readData('./data.json', true)
        const { id } = req.params
        const { name, price } = req.body;
        const index = data.findIndex(el => el.id === Number(id))
        if (index === -1) res.status(404).json({ message: 'Expense not found' })
        data[index] = {
            ...data[index],
            name: name ? name : data[index].name,
            price: price ? price : data[index].price,
            status: { 'last update': new Date().toDateString() }
        }
        await writeData('./data.json', data)
        res.status(200).json({ success: true, message: { updated: data[index] } })
    } catch (error) {
        console.log(error)
    }
})

app.listen(3003, () => {
    console.log('Server is running on port http://localhost:3003');
});

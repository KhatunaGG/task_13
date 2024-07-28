import { readFile, writeFile } from 'fs'
import fs from 'fs/promises'



export async function readData(filepath: string, isParsed: boolean = false) {
    if(!filepath) return ''
    const data = await fs.readFile(filepath, 'utf-8')
    return isParsed ? JSON.parse(data) : data
}


// export const readData = (filePath: string, isParsed: boolean = false) => {

//     if (!fs.exists(fullPath)) {
//         fs.writeFile(fullPath, isParsed ? '[]' : '');
//     }
//     const data = fs.readFileSync(fullPath, 'utf-8');
//     return isJson ? JSON.parse(data) : data;
// };




export async function  writeData(filepath: string, data: any) {
    await fs.writeFile(filepath, JSON.stringify(data))
}
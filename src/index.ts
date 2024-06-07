import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// check connection 
const checkConnection = async() => {
    try{
        await prisma.$connect();
        console.log('Prisma connected to database')

    }catch(err) {
        console.error('Prisma disconnected to database', err)
        
    }finally {
        await prisma.$disconnect();
    }
}
checkConnection();

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello World!');
})

app.get('/create', async(req, res) => {
    const date = new Date();
    const email = date.toISOString()
    try{
        const newUser = await prisma.user.create({ 
            data: {
                name: "hello test one",
                email: `${email}@one.com`,
                gender: "male"
            }
        })
        return res.json(newUser);
    }catch(err) {
        console.error((err as Error).message)
    }
})

app.get('/create-role', async(req, res) => {
    const date = new Date();
    const email = date.toISOString()
    try{
        const newUser = await prisma.role.create({ 
            data: {
                name: `${email}@one.com`,
            }
        })
        return res.json(newUser);
    }catch(err) {
        console.error((err as Error).message)
    }
})

app.get('/user-all', async(req, res) => {
    try{
        const users = await prisma.user.findMany();
        return res.json(users);
    }catch(err) {
        console.error((err as Error).message)
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
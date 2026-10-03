import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient();

export async function connectDB() {
    try {
        await prisma.$connect();
        console.log('Connected to MySQL');
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        throw error;
    }
}

export default prisma;
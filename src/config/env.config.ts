import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

export const env = {
    APP_PORT: process.env.APP_PORT || 3001,
    ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
    DATABASE: {
        CONNECT: process.env.DATABASE_CONNECT as any,
        HOST: process.env.DATABASE_HOST,
        PORT: Number(process.env.DATABASE_PORT),
        USER: process.env.DATABASE_USER,
        PASSWORD: process.env.DATABASE_PASSWORD,
        NAME: process.env.DATABASE_NAME,
        DATABASE_CA_PEM: process.env.DATABASE_CA_PEM
    }
};

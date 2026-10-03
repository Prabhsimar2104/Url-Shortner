import prisma from '../config/db';

export interface CreateUrl {
    originalUrl: string;
    shortUrl: string;
}

export interface UrlStats {
    id: string;
    originalUrl: string;
    shortUrl: string;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
}

export class UrlRepository {

    async create(data: CreateUrl) {
        return await prisma.url.create({
            data
        });
    }

    async findByShortUrl(shortUrl: string) {
        return await prisma.url.findUnique({
            where: {
                shortUrl
            }
        });
    }

    async findAll(): Promise<UrlStats[]> {
        const urls = await prisma.url.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return urls.map(url => ({
            id: url.id.toString(),
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt
        }));
    }

    async incrementClicks(shortUrl: string): Promise<void> {
        await prisma.url.updateMany({
            where: {
                shortUrl
            },
            data: {
                clicks: {
                    increment: 1
                }
            }
        });
    }

    async findStatsByShortUrl(shortUrl: string): Promise<UrlStats | null> {
        const url = await prisma.url.findUnique({
            where: {
                shortUrl
            }
        });

        if (!url) return null;

        return {
            id: url.id.toString(),
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
            createdAt: url.createdAt,
            updatedAt: url.updatedAt
        };
    }
}
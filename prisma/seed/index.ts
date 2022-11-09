import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { authors } from './data/authors.js';
import { books } from './data/books.js';
import { stores } from './data/stores.js';

async function runSeeders() {
  await Promise.all(
    authors.map(async (author) =>
      prisma.author.upsert({
        where: { id: author.id },
        update: {},
        create: author
      })
    )
  );

  await Promise.all(
    books.map(async (book) =>
      prisma.book.upsert({
        where: { id: book.id },
        update: {},
        create: book
      })
    )
  );

  await Promise.all(
    stores.map(async (store) =>
      prisma.store.upsert({
        where: { id: store.id },
        update: {},
        create: store
      })
    )
  );
}

runSeeders()
  .catch((e) => {
    console.error(`There was an error while seeding: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Successfully seeded database. Closing connection.');
    await prisma.$disconnect();
  });

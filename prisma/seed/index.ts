import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { authors } from './data/authors.js';
import { books } from './data/books.js';
import { stores } from './data/stores.js';
import { bookToStore } from './data/bookToStores.js';

async function runSeeders() {
  console.log('Seeding database...');

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

  await Promise.all(
    bookToStore.map(async (b2s) =>
      prisma.book.update({
        where: { id: b2s[0] },
        data: {
          stores: {
            connect: {
              id: b2s[1]
            }
          }
        }
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

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import Authors from './data/authors';
import Books from './data/books';
import Stores from './data/Stores';

async function runSeeders() {
  await Promise.all(
    Authors.map(async (author) =>
      prisma.author.upsert({
        where: { id: author.id },
        update: {},
        create: author
      })
    )
  );

  await Promise.all(
    Books.map(async (book) =>
      prisma.book.upsert({
        where: { id: book.id },
        update: {},
        create: book
      })
    )
  );

  await Promise.all(
    Stores.map(async (store) =>
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

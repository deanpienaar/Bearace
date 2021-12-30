const {PrismaClient} = require('@prisma/client');

// eslint-disable-next-line import/no-mutable-exports
let client;

if (process.env.NODE_ENV === 'production') {
  client = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  client = global.prisma;
}

async function incrementCounter () {
  const {counter} = await client.site.findUnique({where: {id: 1}});

  client.site.update({
    where: {
      id: 1,
    },
    data: {
      counter: counter + 1,
    },
  });
}

incrementCounter();

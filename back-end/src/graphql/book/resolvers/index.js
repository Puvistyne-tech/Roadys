import { getDistanceFromLatLongInKm } from "./scripts/utils";

export default {
  Query: {
    book: (parent, { id }, { prisma }, info) => {
      return prisma.book.findUnique({
        where: {
          id,
        },
        include: { pages: true },
      });
    },
    books: async (parent, args, { prisma }, info) => {
      const longMin = -1.0;
      const latMin = -1.0;
      const longMax = 3.0;
      const latMax = 3.0;

      const query = await prisma.$queryRawUnsafe(`
        SELECT 
          id
        FROM "Book" as b
        WHERE ST_MakePoint(b.longitude, b.latitude)::GEOMETRY && ST_MakeEnvelope(${longMin}, ${latMin}, ${longMax}, ${latMax});
      `);
      console.log(query);
      return prisma.book.findMany({
        where: {
          id: {
            in: query.map(({ id }) => id),
          },
        },
        include: { pages: true },
      });
    },
  },

  Mutation: {
    createBook: async (parent, { data }, { prisma }, info) =>
      prisma.book.create({
        data: {
          ...data,
          pages: {
            create: data.pages,
          },
        },
        include: { pages: true },
      }),
    updateBook: (parent, args, { prisma }, info) =>
      prisma.book.update({
        where: {
          id: args.id,
        },
        data: {
          ...args,
          pages: {
            create: args.pages,
          },
        },
        include: { pages: true },
      }),
    deleteBook: (parent, args, { prisma }, info) =>
      prisma.book.delete({
        where: {
          id: args.id,
        },
        include: { pages: true },
      }),
  },
};

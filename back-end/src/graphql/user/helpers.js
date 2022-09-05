import jwt from 'jsonwebtoken';

const getUser = async (token, prisma) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
    if (err) {
      return null;
    }
    return prisma.user.findUnique({
      where: {
        id: result.id
      },
    })
  });
};

export default getUser;
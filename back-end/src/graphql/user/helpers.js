import jwt from 'jsonwebtoken';


/**
 * It takes a token and a prisma instance, and returns the user associated with the token
 * @param token - The token that was passed in the request header
 * @param prisma - The prisma client instance
 * @returns The user object
 */
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
import { mergeResolvers } from "merge-graphql-schemas";

import bookResolver from "./book/resolvers";
import userResolver from "./user/resolvers";

const resolvers = [bookResolver, userResolver];

export default mergeResolvers(resolvers);

export const Todo = {
  user: ({ userId }, args, { db }, info) => {
    return db.users.find((user) => user.id === userId);
  },
};

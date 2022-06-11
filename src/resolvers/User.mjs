export const User = {
  todos: ({id}, args, { db }, info) => {
    return db.todos.filter((todo) => todo.userId === id);
  },
};

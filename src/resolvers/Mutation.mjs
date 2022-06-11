export const Mutation = {
  addTodo: (parent, { addTodoInput }, { db, pubsub }, infos) => {
    // Je dois tout d'abord vérifier que le userId est correct
    if (!existInArray(db.users, "id", addTodoInput.userId)) {
      //Si ko
      // déclencher une erreur
      throw new Error(`Le user d'id ${addTodoInput.userId} n'existe pas`);
    } else {
      //sinon
      // je dois créer un id
      // définir le status
      // ajouter le nouveau todo dans la bd
      // retourner le nouveau todo
      const newTodo = {
        id: db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 1,
        status: "WAITING",
        ...addTodoInput,
      };
      db.todos.push(newTodo);
      pubsub.publish("todo", { todo: { todo: newTodo, mutation: "ADD" } });
      return newTodo;
    }
    //sinon
    // je dois créer un id
    // définir le status
    // ajouter le nouveau todo dans la bd
    // retourner le nouveau todo
  },
  updateTodo: (parent, { id, updateTodoInput }, { db, pubsub }, infos) => {
    // il faudra vérifier qu'on a un userId et que ce userId correspond à un user
    if (
      updateTodoInput.userId &&
      !existInArray(db.users, "id", updateTodoInput.userId)
    ) {
      throw new Error(`Le user d'id ${updateTodoInput.userId} n'existe pas`);
    } else {
      //Il faut que l'id du todo existe
      const todo = db.todos.find((todoItem) => todoItem.id === id);
      if (!todo) {
        throw new Error(`Le todo d'id ${id} n'existe pas`);
      } else {
        for (let key in updateTodoInput) {
          todo[key] = updateTodoInput[key];
        }
        pubsub.publish("todo", { todo: { todo, mutation: "UPDATE" } });
        return todo;
      }
    }
  },
  deleteTodo: (parent, { id }, { db, pubsub }, infos) => {
    const indexTodo = db.todos.findIndex((todo) => todo.id === id);
    if (indexTodo === -1) {
      throw new Error("Todo innexistant");
    } else {
      const [todo] = db.todos.splice(indexTodo, 1);
      pubsub.publish("todo", { todo: { todo, mutation: "DELETE" } });
      return todo;
    }
  },
};

function existInArray(array, attribut, value) {
  console.log(array, attribut, value);
  return array.some((element) => element[attribut] == value);
}

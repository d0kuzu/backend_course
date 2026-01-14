export let users = [];
export let id_counter = 0;

export class DB {
  static create(name) {
    users.push({ ID: id_counter, name: name })
    id_counter++;
  }

  static update(id, name){
    if (users.some(user => user.ID === id))
    {
      users.forEach((user) => {
        if (user.ID === id) user.name = name;
      });
      return true;
    }
    return false;
  }

  static delete(id) {
    if (users.some(user => user.ID === id)){
      users = users.filter((user) => user.ID !== id);
      return true;
    }
    return false;
  }
}

export let users = []
export let id_counter = 0

export class DB {
  static create(name) {
    users.push({ ID: id_counter, name: name })
    id_counter++
  }

  static update(id, name){
    users.some(user => { if (user.id === id) user.name = name; })
  }

  static delete(id) {
    if (users.find(user => user.id === id)) return -1;
    users = users.filter((user) => user.id !== id)
    return 1;
  }
}

import User from '../components/user.js';
import { getUsers } from '../utilities/services.js';

export default class Content {
  constructor() {
    this.node = document.createElement('main');

    getUsers()
      .then(
        users => {
          users.forEach(userData => {
            let user = new User(userData);
            this.node.appendChild(user.getNode());
          })
        },
        error => console.log(error)
      );
  }

  getNode() {
    return this.node;
  }
}
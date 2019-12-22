import { getDirectFriendsIDs, getFriendsOfFriendsIDs, getSuggestedFriendsIDs } from "../utilities/utilities.js";
import { getUsers } from "../utilities/services.js";

export default class User {
  constructor(userData) {
    this.userData = userData;

    this.node = document.createElement('div');
    this.node.className = 'user-container';
    this.node.id = this.userData.id;
    this.node.style.left = `${Math.random() * 150 - 50}px`;
    this.node.style.top = `${Math.random() * 150 - 50}px`;

    let txtFullName = document.createElement('h4');
    txtFullName.className = 'fullname';
    if (typeof this.userData.firstName === 'string') {
      txtFullName.innerHTML = `${this.userData.firstName}`;
    }
    if (typeof this.userData.surname === 'string') {
      txtFullName.innerHTML += ` ${this.userData.surname}`;
    }

    let txtAge = document.createElement('p');
    if (typeof this.userData.age === 'number') {
      txtAge.innerHTML = `Age: <span>${this.userData.age ? this.userData.age : ''}</span>`;
    } else {
      txtAge.innerHTML = `Age: <span>/</span>`;
    }

    let txtGender = document.createElement('p');
    if (typeof this.userData.gender === 'string') {
      txtGender.innerHTML = `Gender: <span>${this.userData.gender}</span>`;
    }

    this.selectTypeOfFriends = document.createElement('select');
    this.selectTypeOfFriends.className = 'type-of-friends';

    let option = document.createElement("option");
    option.value = 'Choose Type';
    option.text = 'Choose Type';
    option.style.display = 'none';
    this.selectTypeOfFriends.add(option);

    this.addOption(this.selectTypeOfFriends, 'Direct Friends');
    this.addOption(this.selectTypeOfFriends, 'Friends of Friends');
    this.addOption(this.selectTypeOfFriends, 'Suggested Friends');

    this.node.appendChild(txtFullName);
    this.node.appendChild(txtAge);
    this.node.appendChild(txtGender);
    this.node.appendChild(this.selectTypeOfFriends);

    this.selectTypeOfFriends.addEventListener('change', (e) => {
      let userElements = document.querySelectorAll('.user-container');
      for (let user of userElements) {
        user.style.backgroundColor = 'rgb(49, 105, 138)';
        user.style.color = 'white';
        if (!user.isSameNode(this.node)) {
          user.children[3].value = 'Choose Type';
        }
      }
      this.node.style.backgroundColor = 'rgb(247, 248, 201)';

      this.node.style.color = 'rgba(0, 0, 0, 0.665)';

      let lines = document.querySelectorAll('.line');
      lines.forEach(line => line.remove());

      switch (e.target.value) {
        case 'Direct Friends':
          return getDirectFriendsIDs(this.userData)
            .then(friendsIDs => {
              friendsIDs.forEach(friendID => {
                let friend = document.getElementById(friendID);
                friend.style.backgroundColor = 'rgb(169, 216, 147)';
                friend.style.color = 'rgba(0, 0, 0, 0.665)';
                this.drawLine(this.node, friend);
              });
            });

        case 'Friends of Friends':
          return getFriendsOfFriendsIDs(this.userData)
            .then(friendsOfFriendsIDs => {
              friendsOfFriendsIDs.forEach(friendOfFriendID => {
                let friendOfFriend = document.getElementById(friendOfFriendID);
                friendOfFriend.style.backgroundColor = 'rgb(169, 216, 147)';
                friendOfFriend.style.color = 'rgba(0, 0, 0, 0.665)';

                // Conecting friends of friends through mutal friends (It's ugly)
                // getUsers()
                //   .then(
                //     users => {
                //       let connectedUsers = users.filter(user => {
                //         return (user.friends.includes(friendOfFriendID) && user.friends.includes(this.userData.id));
                //       });

                //       connectedUsers.forEach(user => {
                //         let userElement = document.getElementById(user.id);
                //         this.drawLine(this.node, userElement);
                //         this.drawLine(userElement, friendOfFriend);
                //       });
                //     },
                //     error => console.log(error)
                //   );

                this.drawLine(this.node, friendOfFriend);
              });
            });

        case 'Suggested Friends':
          return getSuggestedFriendsIDs(this.userData)
            .then(suggestedFriendsIDs => {
              suggestedFriendsIDs.forEach(suggestedFriendID => {
                let suggestedFriend = document.getElementById(suggestedFriendID);
                suggestedFriend.style.backgroundColor = 'rgb(169, 216, 147)';
                suggestedFriend.style.color = 'rgba(0, 0, 0, 0.665)';

                // Conecting suggested friends through mutal friends (It's ugly)
                // getUsers()
                // .then(
                //   users => {
                //     let connectedUsers = users.filter(user => {
                //       return (user.friends.includes(suggestedFriendID) && user.friends.includes(this.userData.id));
                //     });
                    
                //     connectedUsers.forEach(user => {
                //       let userElement = document.getElementById(user.id);
                //       this.drawLine(this.node, userElement);
                //       this.drawLine(userElement, suggestedFriend);
                //     });
                //   },
                //   error => console.log(error)
                // );

                this.drawLine(this.node, suggestedFriend);
              });
            });
      }
    });
  }

  addOption(selectElement, optionText) {
    let option = document.createElement("option");
    option.value = optionText;
    option.text = optionText;
    selectElement.add(option);
  }

  drawLine(start, end) {
    let line = document.createElement('div');
    line.className = 'line';

    let x = start.offsetLeft - end.offsetLeft;
    let y = start.offsetTop - end.offsetTop
    line.style.width = `${Math.sqrt(x ** 2 + y ** 2)}px`;

    line.style.transform = `scaleY(-1) rotate(${Math.atan2(x, y) * 180 / Math.PI + 90}deg)`;

    start.appendChild(line);
  }

  getNode() {
    return this.node;
  }
}

import { getUsers } from "./services.js";

export const getDirectFriendsIDs = ({ id }) => {
  return getUsers()
    .then(
      users => users.find(user => user.id === id).friends,
      error => console.log(error)
    );
}

export const getFriendsOfFriendsIDs = ({ id, friends: friendsIDs }) => {
  return getUsers()
    .then(
      users => {
        let friendsOfFriendsIDs = new Set();
        let userFriends = users.filter(user => friendsIDs.includes(user.id));

        userFriends.forEach(friend => {
          friend.friends.forEach(friendOfFriendID => {
            if (!friendsIDs.includes(friendOfFriendID) && friendOfFriendID !== id) {
              friendsOfFriendsIDs.add(friendOfFriendID);
            }
          });
        });
        return friendsOfFriendsIDs;
      },
      error => console.log(error)
    );
}

export const getSuggestedFriendsIDs = ({ id, friends: friendsIDs }) => {
  return getUsers()
    .then(
      users => {
        let friendsOfFriendsIDs = [];
        let userFriends = users.filter(user => friendsIDs.includes(user.id));

        userFriends.forEach(friend => {
          friend.friends.forEach(friendOfFriendID => {
            if (!friendsIDs.includes(friendOfFriendID) && friendOfFriendID !== id) {
              friendsOfFriendsIDs.push(friendOfFriendID);
            }
          });
        });

        let suggestedFriendsIDs = friendsOfFriendsIDs.reduce((acc, id, idx, arr) => {
          if (arr.includes(id, idx + 1)) {
            return acc.add(id);
          }
          return acc;
        }, new Set());
        return suggestedFriendsIDs;
      },
      error => console.log(error)
    );
}
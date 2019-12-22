export const getUsers = () => {
  return fetch('./assets/data.json')
    .then(
      res => res.json(),
      error => console.log(error)
    );
};
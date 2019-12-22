export default class Header {
  constructor(){
    this.node = document.createElement('header');

    let txtHeading = document.createElement('h1');
    txtHeading.textContent = 'Social Network';

    this.node.appendChild(txtHeading);
  }

  getNode() {
    return this.node;
  }
}
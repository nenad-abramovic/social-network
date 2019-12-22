export default class Footer {
  constructor() {
    this.node = document.createElement('footer');

    let txtCopyright = document.createElement('label');
    txtCopyright.textContent = '© nenad abramovic';

    this.node.appendChild(txtCopyright);
  }

  getNode() {
    return this.node;
  }
}
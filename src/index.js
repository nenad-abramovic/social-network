import Header from '../src/layout/header.js';
import Content from '../src/layout/content.js';
import Footer from '../src/layout/footer.js';

const root = document.getElementById('root');

let header = new Header();
let content = new Content();
let footer = new Footer();

root.appendChild(header.getNode());
root.appendChild(content.getNode());
root.appendChild(footer.getNode());

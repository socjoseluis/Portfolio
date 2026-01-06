import { initHeader } from './header.js';
import { initNav } from './nav.js';
const header = initHeader();



if (!header) {
  throw new Error('Header not found');
}
initNav(header);


const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());


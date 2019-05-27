
import './styles/index.less';
import Chessboard from "./Chessboard.js";

let wrap = document.createElement("div")
wrap.setAttribute("class","chessboard")
let chessboard = new Chessboard(wrap)
document.getElementById("game1").firstElementChild.appendChild( chessboard.elem ); 

// console.log(chessboard);




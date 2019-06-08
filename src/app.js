
import './styles/index.less';
import './styles/chessboard.less';
import './script/preset.js'
import Chessboard from "./Chessboard.js";

document.getElementById("startGame").addEventListener("click",function(evt){
  document.querySelector(".main").style.display = 'flex'; 
  
  let chessboard = new Chessboard( document.getElementById("game1") )
  let currentUser = document.querySelector(".currentUser")
  chessboard.event.on('afterRun',function(evt,data){
    // console.log("# ",data);
    if (data === 0) {
      currentUser.textContent = '红方'
      currentUser.style.color = 'red'
    }
    else if (data === 1) {
      currentUser.textContent = '黑方'
      currentUser.style.color = 'black'
    }
    else {
      // console.log('初始执行');
      currentUser.textContent = `红方`
      currentUser.style.color = 'red'
    }
  },true)
  chessboard.event.on("finish",function(evt,data){
    console.log(data);
  })
  // console.log(chessboard);
  this.setAttribute("disabled","true")
})





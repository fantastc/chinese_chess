/* 
  方式一: 移动|替换 采用惰性模式
    通过点击后判断是否可执行响应的操作 
  方式二: 计算全部可移动 及 吃子的位置 
  
  
*/
// TODO: 将军提示 提示执棋方 将帅碰面 棋子拖放 



export default class Chessboard {
  constructor(wrapEl) {
    this._chessTypes = {
      blackCar: {
        type: 'car',
        name: '车',
        color: 'black',
        steps: [ 
          [0,1],
          [0,2],
          [0,3],
          [0,4],
          [0,5],
          [0,6],
          [0,7],
          [0,8],
          [0,9],
          [0,-1],
          [0,-2],
          [0,-3],
          [0,-4],
          [0,-5],
          [0,-6],
          [0,-7],
          [0,-8],
          [0,-9],
          [1,0],
          [2,0],
          [3,0],
          [4,0],
          [5,0],
          [6,0],
          [7,0],
          [8,0],
          [-1,0],
          [-2,0],
          [-3,0],
          [-4,0],
          [-5,0],
          [-6,0],
          [-7,0],
          [-8,0],
        ],
        range: [
          [0,0], 
          [9,8]
        ],
        
        init: [
          [0,0],
          [0,8],
        ],
      },
      blackHorse: {
        type: 'horse',
        name: '马',
        color: 'black',
        range: [
          [0,0], 
          [9,8]
        ],
        steps: [ 
          [1,2],
          [1,-2],
          [-1,-2],
          [-1,2],
          [2,1],
          [2,-1],
          [-2,-1],
          [-2,1],
        ],
        init: [
          [0,1],
          [0,7],
        ],
      },
      blackMinister: {
        type: 'minister',
        name: '相',
        color: 'black',
        range: [
          [0,0], 
          [4,8]
        ],
        steps: [ 
          [2,2],
          [2,-2],
          [-2,-2],
          [-2,2],
        ],
        init: [
          [0,2],
          [0,6],
        ],
      },
      blackServant: {
        type: 'servant',
        name: '士',
        color: 'black',
        range: [
          [0,3], 
          [2,5],  
        ],
        steps: [ 
          [1,1],
          [1,-1],
          [-1,-1],
          [-1,1],
        ],
        init: [
          [0,3],
          [0,5],
        ]
      },
      blackKing: {
        type: 'king',
        name: '将', // 名称 
        color: 'black',
        range: [    // 移动范围 
          [0,3], // 起点坐标 
          [2,5]  // 终点坐标 
        ],
        steps: [ 
          [0,-1], // 坐标增量 
          [0,1],
          [1,0],
          [-1,0],
        ],
        init: [ // 初始坐标 
          [0,4],
        ], 
      },
      blackGun: {
        type: 'gun',
        name: '炮',
        color: 'black',
        range: [
          [0,0], 
          [9,8]
        ],
        steps: [ 
          [0,1],
          [0,2],
          [0,3],
          [0,4],
          [0,5],
          [0,6],
          [0,7],
          [0,8],
          [0,9],
          [0,-1],
          [0,-2],
          [0,-3],
          [0,-4],
          [0,-5],
          [0,-6],
          [0,-7],
          [0,-8],
          [0,-9],
          [1,0],
          [2,0],
          [3,0],
          [4,0],
          [5,0],
          [6,0],
          [7,0],
          [8,0],
          [-1,0],
          [-2,0],
          [-3,0],
          [-4,0],
          [-5,0],
          [-6,0],
          [-7,0],
          [-8,0],
        ],
        init: [
          [2,1],
          [2,7],
        ],
      },
      blackSoldier: {
        type: 'soldier',
        name: '卒',
        color: 'black',
        range: [
          [4,0], 
          [9,8]
        ],
        steps: [ 
          [0,1],
          [0,-1],
          [1,0],
          [-1,0],
        ],
        init: [
          [3,0],
          [3,2],
          [3,4],
          [3,6],
          [3,8],
        ],
      },
      redSoldier: {
        type: 'soldier',
        name: '兵',
        color: 'red',
        range: [
          [0,0],
          [5,8], 
        ],
        steps: [ 
          [0,1],
          [0,-1],
          [1,0],
          [-1,0],
        ],
        init: [
          [6,0],
          [6,2],
          [6,4],
          [6,6],
          [6,8],
        ],
      },
      redGun: {
        type: 'gun',
        name: '炮',
        color: 'red',
        range: [
          [0,0], 
          [9,8]
        ],
        steps: [ 
          [0,1],
          [0,2],
          [0,3],
          [0,4],
          [0,5],
          [0,6],
          [0,7],
          [0,8],
          [0,9],
          [0,-1],
          [0,-2],
          [0,-3],
          [0,-4],
          [0,-5],
          [0,-6],
          [0,-7],
          [0,-8],
          [0,-9],
          [1,0],
          [2,0],
          [3,0],
          [4,0],
          [5,0],
          [6,0],
          [7,0],
          [8,0],
          [-1,0],
          [-2,0],
          [-3,0],
          [-4,0],
          [-5,0],
          [-6,0],
          [-7,0],
          [-8,0],
        ],
        init: [
          [7,1],
          [7,7],
        ],
      },
      redCar: {
        type: 'car',
        name: '车',
        color: 'red',
        range: [
          [0,0], 
          [9,8]
        ],
        steps: [ 
          [0,1],
          [0,2],
          [0,3],
          [0,4],
          [0,5],
          [0,6],
          [0,7],
          [0,8],
          [0,-1],
          [0,-2],
          [0,-3],
          [0,-4],
          [0,-5],
          [0,-6],
          [0,-7],
          [0,-8],
          [1,0],
          [2,0],
          [3,0],
          [4,0],
          [5,0],
          [6,0],
          [7,0],
          [8,0],
          [9,0],
          [-1,0],
          [-2,0],
          [-3,0],
          [-4,0],
          [-5,0],
          [-6,0],
          [-7,0],
          [-8,0],
          [-9,0],
        ],
        init: [
          [9,0],
          [9,8],
        ],
      },
      redHorse: {
        type: 'horse',
        name: '马',
        color: 'red',
        range: [
          [0,0], 
          [9,8]
        ],
        steps: [ 
          [1,2],
          [1,-2],
          [-1,-2],
          [-1,2],
          [2,1],
          [2,-1],
          [-2,-1],
          [-2,1],
        ],
        init: [
          [9,1],
          [9,7],
        ],
      },
      redMinister: {
        type: 'minister',
        name: '相',
        color: 'red',
        range: [
          [5,0], 
          [9,8]
        ],
        steps: [ 
          [2,2],
          [2,-2],
          [-2,-2],
          [-2,2],
        ],
        init: [
          [9,2],
          [9,6],
        ],
      },
      redServant: {
        type: 'servant',
        name: '仕',
        color: 'red',
        range: [
          [7,3], 
          [9,5]  
        ],
        steps: [ 
          [1,1],
          [1,-1],
          [-1,-1],
          [-1,1],
        ],
        init: [
          [9,3],
          [9,5],
        ],
      },
      redKing: {
        type: 'king',
        name: '帅', // 名称 
        color: 'red',
        range: [    // 移动范围 
          [7,3], 
          [9,5]  
        ],
        steps: [ 
          [0,-1], // 坐标增量 
          [0,1],
          [1,0],
          [-1,0],
        ],
        init: [ // 初始坐标 
          [9,4],
        ], 
      },
    };
    // this._userRed = [];
    // this._userBlack = [];
    this._currentChess = null; 
    this._currentMovables = []
    this._currentReplaces = []
    this._count = 0; 

    // [ // 10行,9列 
    //   // [
    //   //   {
    //   // 
    //   //   },
    //   //   ...,
    //   // ],
    //   // ...,
    // ];
    this.elem = document.createElement("div")
    this.elem.setAttribute("class","chessboard")
    this._layout = new Array(10).fill('').map((itm,idx)=>{
      let row = document.createElement("div")
      row.setAttribute("class","row")
      this.elem.appendChild(row)
      return new Array(9).fill('').map((itm1,idx1)=>{
        let cell = document.createElement("div")
        cell.setAttribute("class","cell")
        row.appendChild(cell)
        let chess = document.createElement("div")
        chess.setAttribute("class","chess")
        chess.dataset.status = 'blank';
        cell.appendChild(chess)
        let chessObj = {
          elem: chess,
          position: [idx,idx1], 
          
          name: '',
          status: 'blank', // normal active move replace 
          // id: '',
          // type: '',
          // range: [], 
        }
        this.bindEvent(chessObj)
        return chessObj;
      })
    })
    
    this.event = new EventTarget();
    this.layoutChess();
    
    let gameWrap = document.createElement("div")       
    gameWrap.setAttribute("class","gameWrap")
    gameWrap.appendChild(this.elem)
    wrapEl.appendChild( gameWrap )
  }
  
  layoutChess(){
    let that = this; 
    for(var key in this._chessTypes){
      let type = this._chessTypes[key]; 
      type.init.forEach(pos=>{
        let chessObj = this._layout[pos[0]][pos[1]]
        this.renderChess(chessObj,{
          name: type.name,
          status: 'normal',
          color: type.color,
          id: key,
          type: type.type,
          range: type.range,
        })
        
        // if (type.color==='red') { 
        //   this._userRed.push({
        //     ...type,
        //     pos: pos, 
        //     el: chess, 
        //   })
        // }
        // else {
        //   this._userBlack.push({
        //     ...type,
        //     pos: pos, 
        //     el: chess, 
        //   })
        // }
      })
    };
  }
  bindEvent(chessObj){
    let that = this; 
    chessObj.elem.addEventListener("click",function(evt){
      
      // 点击放置位置: 移动 
      if ( chessObj.status==='move' && that._currentChess ) {
        that.chessRun(that._currentChess,chessObj,false)
        that._currentChess = null;
        return ; 
      }
      
      // 点击替代位置: 吃子 
      if ( chessObj.status==='replace' ) {
        that.chessRun(that._currentChess,chessObj,true)
        return ; 
      }

    })
    chessObj.elem.addEventListener("mousedown",function(evt){
      // 是否可执棋  
      let isChoose = that._count%2===0&&chessObj.color==='red' || 
        that._count%2===1&&chessObj.color==='black' 
      if ( isChoose ) {
        // 执棋   
        if ( chessObj.status==='normal' ) {
          if (that._currentChess && that._currentChess.status==='active') {
            that.renderChess(that._currentChess,{
              status: 'normal', 
            })
            that.clearStatus();
          }
          that.renderChess(chessObj,{
            status: 'active',
          })
          that._currentChess = chessObj; 
          that.chessAblePostion(that._currentChess)
        }
        // 取消执棋    
        else if ( chessObj.status==='active') {
          that.renderChess(chessObj,{
            status: 'normal',
          })
          that._currentChess = null; 
          that.clearStatus();
        }
      }
      
    })
  }
  typeIsMovable(type,startPos,endPos,color){
    let that = this; 
    let _map = {
      car(startPos,endPos){
        if ( endPos[0] === startPos[0] ) {
          let arr = that._layout[endPos[0]].slice(startPos[1]+1,endPos[1]).length?
            that._layout[endPos[0]].slice(startPos[1]+1,endPos[1]) : 
            that._layout[endPos[0]].slice(endPos[1]+1,startPos[1]) 
          return arr.every((itm,idx)=>{
            return !itm.id 
          })
        }
        else {
          let colArr = that._layout.map((itm,idx)=>{
            return itm[endPos[1]]
          })
          let arr = colArr.slice(startPos[0]+1,endPos[0]).length?
          colArr.slice(startPos[0]+1,endPos[0]) : 
          colArr.slice(endPos[0]+1,startPos[0]) 
          return arr.every((itm,idx)=>{
            return !itm.id 
          })
        }
      }, 
      horse(startPos,endPos){
        let r = endPos[0]-startPos[0];
        let c = endPos[1]-startPos[1]
        if ( Math.abs(r)===2 ) {
          return !that._layout[startPos[0]+r/Math.abs(r)][startPos[1]].id 
        }
        else {
          return !that._layout[startPos[0]][startPos[1]+c/Math.abs(c)].id 
        }
      },
      minister(startPos,endPos){
        let r = endPos[0]-startPos[0];
        let c = endPos[1]-startPos[1];
        let unitR = r/Math.abs(r)
        let unitC = c/Math.abs(c)
        return !that._layout[startPos[0]+unitR][startPos[1]+unitC].id 
      },
      servant(startPos,endPos){
        return true; 
      },
      king(startPos,endPos){
        return true; 
      },
      // gun(startPos,endPos){ }, // 等价于 car 
      soldier(startPos,endPos,color){ 
        if ( color==='red' ) {
          if (startPos[0]>=5) {
            return endPos[0]-startPos[0]<0
          }
          else {
            return endPos[0]-startPos[0]<=0
          }
        }
        else {
          if (startPos[0]<=4) {
            return endPos[0]-startPos[0]>0
          }
          else {
            return endPos[0]-startPos[0]>=0
          }
        }
      }, 
      
    }
    if (type==='gun') { return _map.car(startPos,endPos); }
    return _map[type](startPos,endPos,color);
  }
  typeIsReplace(type,startPos,endPos,color){
    let that = this; 
    let _map = {
      car(startPos,endPos){
        return that.typeIsMovable(type,startPos,endPos)
      }, 
      horse(startPos,endPos){
        return that.typeIsMovable(type,startPos,endPos)
      }, 
      minister(startPos,endPos){
        return that.typeIsMovable(type,startPos,endPos)
      }, 
      servant(startPos,endPos){
        return that.typeIsMovable(type,startPos,endPos)
      }, 
      king(startPos,endPos){
        return that.typeIsMovable(type,startPos,endPos)
      }, 
      gun(startPos,endPos){
        if ( endPos[0] === startPos[0] ) {
          let arr = that._layout[endPos[0]].slice(startPos[1]+1,endPos[1]).length?
            that._layout[endPos[0]].slice(startPos[1]+1,endPos[1]) : 
            that._layout[endPos[0]].slice(endPos[1]+1,startPos[1]) 
          let sum = 0; 
          arr.forEach((itm,idx)=>{
            if (itm.id) { sum++; } 
          })
          return sum===1;
        }
        else {
          let colArr = that._layout.map((itm,idx)=>{
            return itm[endPos[1]]
          })
          let arr = colArr.slice(startPos[0]+1,endPos[0]).length?
          colArr.slice(startPos[0]+1,endPos[0]) : 
          colArr.slice(endPos[0]+1,startPos[0]) 
          let sum = 0; 
          arr.forEach((itm,idx)=>{
            if (itm.id) { sum++; } 
          })
          return sum===1;
        }
      }, 
      soldier(startPos,endPos,color){
        return that.typeIsMovable(type,startPos,endPos,color)
      }, 
    }
    
    return _map[type](startPos,endPos,color);
  }
  
  // 移动棋子 
  chessRun(startChess,endChess,isReplace){
    // 吃子 
    if (isReplace) { 
      if ( endChess.type==='king' ) {
        this.event.emit('finish', endChess.color==="red"?0:1)
      }
    }
    
    this._count++; 
    this.event.emit('afterRun',this._count%2);
    this.clearStatus();
    this.renderChess(endChess,{
      status: 'normal',
      name: startChess.name,
      color: startChess.color,
      id: startChess.id,
      range: startChess.range,
      type: startChess.type,
    })
    this.renderChess(startChess,{
      status: 'blank',
      name: '',
      color: '',
      id: '',
      type: '',
      range: [[0,0],[0,0]],
    })
    
  }
  // 更新棋子视图 
  renderChess(chessObj,{status,name,color,id,range,type}){
    chessObj.status = status; 
    chessObj.elem.dataset.status = status
    if ( name!==undefined ) {
      chessObj.name = name
      chessObj.elem.textContent = name
    }
    if (color!==undefined) {
      chessObj.elem.style.color = color
      chessObj.color = color; 
    }
    if (id!==undefined) { chessObj.id = id }
    if (range!==undefined) { chessObj.range = range }
    if (type!==undefined) { chessObj.type = type }
  }
  // 清空状态  
  clearStatus(){ // 清理可移动&可替换的状态 
    this._currentMovables.forEach((itm,idx)=>{
      this.renderChess(itm,{
        status: 'blank',
        name: '',
        color: '',
        id: '',
        type: '',
        range: [],
      })
    })
    this._currentReplaces.forEach((itm,idx)=>{
      this.renderChess(itm,{
        status: 'normal',
      })
    })
    this._currentMovables = []
    this._currentReplaces = []
  }
  // 计算棋子的可用位置 
  chessAblePostion(chessObj){
    let id = chessObj.id; 
    let type = this._chessTypes[id]
    let row = chessObj.position[0];
    let col = chessObj.position[1];
    let range = chessObj.range; 
    this._currentMovables = []
    this._currentReplaces = []
    
    type.steps.forEach((stp,idx)=>{
      // 范围检测 
      let _r = row+stp[0]; 
      let _rArr = this._layout[_r] 
      if (!_rArr || _r<range[0][0] || _r>range[1][0]) { return ; }
      let _c = col+stp[1]
      let _chessObj = _rArr[_c];
      if ( !_chessObj || _c<range[0][1] || _c>range[1][1] ) { return ; }
      
      // 可移动的位置 
      if (_chessObj.status==='blank') {
        if ( this.typeIsMovable(chessObj.type,chessObj.position,_chessObj.position,chessObj.color ) ) {
          this.renderChess(_chessObj,{
            status: 'move',
          })
          this._currentMovables.push( _chessObj ) 
        }
      }
      // 可替换的位置  
      if ( _chessObj.status=='normal' && _chessObj.color!==chessObj.color ) {
        if ( this.typeIsReplace(chessObj.type,chessObj.position,_chessObj.position,chessObj.color ) ) {
          this.renderChess(_chessObj,{
            status: 'replace',
          })
          this._currentReplaces.push( _chessObj )   
        }
      }
      
      // 特殊规则检查 
      
    })
    
  }
  
  
}










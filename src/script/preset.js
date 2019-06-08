

// 自定义事件 
// 解决匿名函数无法解绑事件的问题 
EventTarget.prototype.evtHandleMaps = {
  // evtName: [ handle, ], 
}
EventTarget.prototype.on = function(evtName,handle,instant){
  if ( !this.evtHandleMaps[evtName] ) { this.evtHandleMaps[evtName] = [] }
  let _hande = function(evt,data){
    // evt   原生事件对象 
    // data  自定义的传递数据 
    handle(evt,data)
  }
  this.evtHandleMaps[evtName].push(_hande)
  
  this.addEventListener(evtName,_hande)
  if (instant) { this.emit(evtName,{}) } // 立即触发 
}
EventTarget.prototype.off = function(evtName,handle){
  if (handle) {
    this.removeEventListener(evtName,handle)
  }
  else {
    let handles = this.evtHandleMaps[evtName]; 
    handles && handles.forEach((fn,idx)=>{
      this.removeEventListener(evtName,fn); 
    })
  }
}
EventTarget.prototype.emit = function(evt,data){
  /* 方式一: 原生触发方式 */
  if ( typeof evt === 'object') {
    // evt._data = data; // 传递自定义数据不优雅 
    this.dispatchEvent(evt);
  }
  /* 方式二: 直接执行回调 */
  else if( typeof evt === 'string'){
    let handles = this.evtHandleMaps[evt]; 
    handles && handles.forEach((fn,idx)=>{
      fn(null,data);
    })
  }
}



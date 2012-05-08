!function($){
$.serializeObject = function(obj){
  var o={},lookup=o,a = obj;
  $.each(a,function(){
    var named = this.name.replace(/\[([^\]]+)?\]/g,',$1').split(','),
        cap = named.length - 1,
        i = 0;
    for(;i<cap;i++) {
      // move down the tree - create objects or array if necessary
      if(lookup.push){ // this is an array, add values instead of setting them
        // push an object if this is an empty array or we are about to overwrite a value
        if( !lookup[lookup.length -1] // this is an empty array
            || lookup[lookup.length -1].constructor !== Object //current value is not a hash
            || lookup[lookup.length -1][named[i+1]] !== undefined //current item is already set
        ){
          lookup.push({});
        }
        lookup = lookup[lookup.length -1];
      } else {
        lookup = lookup[named[i]] = lookup[named[i]] || (named[i+1]==""?[]:{});
      }
    }
    if(lookup.push){
      lookup.push(this.value);
    }else{
      lookup[named[cap]]=this.value;
    }
    lookup = o;
  }); 
  return o;
};

$.deserializeObject = function deserializeObject(json,arr,prefix){
  var i,j,thisPrefix,objType;
  arr = arr || [];
  if(Object.prototype.toString.call(json) ==='[object Object]'){
    for(i in json){
      thisPrefix = prefix ? [prefix,'[',i,']'].join('') : i;
      if(json.hasOwnProperty(i)){
        objType = Object.prototype.toString.call(json[i])
        if(objType === '[object Array]'){
          for(j = 0,jsonLen = json[i].length;j<jsonLen;j++){
            deserializeObject(json[i][j],arr,thisPrefix+'[]');
          }
        }else if(objType === '[object Object]'){
            deserializeObject(json[i],arr,thisPrefix);
        }else {
          arr.push({
            name : thisPrefix,
            value : json[i]
          });
        }
      }
    }
  } else {
    arr.push({
      name : prefix,
      value : json
    });
  }
  return arr;
}

$.fn.serializeObject = $.fn.serializeObject || function(){
  return $.serializeObject(this.serializeArray());
};


}(jQuery);

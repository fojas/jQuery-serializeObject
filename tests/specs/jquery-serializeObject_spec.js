describe("jQuery.serializeObject", function(){
  var $ = jQuery;
  it("should serialize a simple form",function(){
    var elems = [
      {name:"name1",value:"value1"},
      {name:"name2",value:"value2"},
      {name:"name3",value:"value3"}];

    var obj = $.serializeObject(elems);
    for(var i = elems.length;i--;){
      expect(obj[elems[i].name]).toBe(elems[i].value)
    }
  });

  it("should serialize a form with an array of elements", function(){
    var elems = [
      {name:"name[]",value:"value1"},
      {name:"name[]",value:"value2"},
      {name:"name[]",value:"value3"}];

    var obj = $.serializeObject(elems);
    expect(obj.name.length).toBe(3);
    for(var i = obj.name.length; i--;){
      expect(obj.name[i]).toBe(elems[i].value);
    }
  });

  it("should serialize a form with an array of elements nested in an object", function(){
    var elems = [
      {name:"name[prop][]",value:"value1"},
      {name:"name[prop][]",value:"value2"},
      {name:"name[prop][]",value:"value3"}];

    var obj = $.serializeObject(elems);
    expect(obj.name.prop.length).toBe(3);
    for(var i = obj.name.prop.length; i--;){
      expect(obj.name.prop[i]).toBe(elems[i].value);
    }
  });

  it("should serialize a form with objects nested in arrays", function(){
    var elems = [
      {name:"name[][prop1]",value:"value1"},
      {name:"name[][prop2]",value:"value2"},
      {name:"name[][prop1]",value:"value3"},
      {name:"name[][prop2]",value:"value4"}];

    var obj = $.serializeObject(elems);
    expect(obj.name.length).toBe(2);

    expect(obj.name[0].prop1).toBe("value1");
    expect(obj.name[0].prop2).toBe("value2");
    expect(obj.name[1].prop1).toBe("value3");
    expect(obj.name[1].prop2).toBe("value4");
  });

  it("should serialize a form with a mix of objects and strings in an array", function(){
    var elems = [
      {name:"name[][prop1]",value:"value1"},
      {name:"name[][prop2]",value:"value2"},
      {name:"name[]",value:"value3"},
      {name:"name[][prop1]",value:"value4"},
      {name:"name[][prop2]",value:"value5"}];

    var obj = $.serializeObject(elems);
    expect(obj.name.length).toBe(3);

    expect(obj.name[0].prop1).toBe("value1");
    expect(obj.name[0].prop2).toBe("value2");
    expect(obj.name[1]).toBe("value3");
    expect(obj.name[2].prop1).toBe("value4");
    expect(obj.name[2].prop2).toBe("value5");

  });
});

describe("jQuery.deserializeObject",function(){
  var $ = jQuery;
  it("should deserialize a simple object",function(){
    var obj = { name1 : "value1", name2 : "value2", name3 : "value3"};
    var elems = $.deserializeObject(obj);
    for(var i = elems.length;i--;){
      expect(obj[elems[i].name]).toBe(elems[i].value)
    }
  });

  
  it("should deserialize a form with an array of elements", function(){
    var obj = {name : ['value1','value2','value3']};
    var elems = $.deserializeObject(obj);
    expect(elems.length).toBe(3);
    for(var i = obj.name.length; i--;){
      expect(obj.name[i]).toBe(elems[i].value);
    }
  });

  it("should deserialize a form with an array of elements nested in an object", function(){
    var obj = {name:{prop:['value1','value2','value3']}};

    var elems = $.deserializeObject(obj);
    expect(elems.length).toBe(3);
    for(var i = obj.name.prop.length; i--;){
      expect(obj.name.prop[i]).toBe(elems[i].value);
    }
  });

  it("should deserialize a form with objects nested in arrays", function(){
    var obj = {name : [
      { prop1:'value1', prop2:'value2' },
      { prop1:'value3', prop2:'value4' }
    ]};
    var elems = $.deserializeObject(obj);
    expect(elems.length).toBe(4);

    expect(elems[0].name).toBe("name[][prop1]");
    expect(elems[1].name).toBe("name[][prop2]");
    expect(elems[2].name).toBe("name[][prop1]");
    expect(elems[3].name).toBe("name[][prop2]");
    expect(elems[0].value).toBe("value1");
    expect(elems[1].value).toBe("value2");
    expect(elems[2].value).toBe("value3");
    expect(elems[3].value).toBe("value4");
  });

  it("should serialize a form with a mix of objects and strings in an array", function(){
    var obj = {name : [
      { prop1:'value1', prop2:'value2' },
      'value3',
      { prop1:'value4', prop2:'value5' }
    ]};

    var elems = $.deserializeObject(obj);
    expect(elems.length).toBe(5);

    expect(elems[0].name).toBe("name[][prop1]");
    expect(elems[1].name).toBe("name[][prop2]");
    expect(elems[2].name).toBe("name[]");
    expect(elems[3].name).toBe("name[][prop1]");
    expect(elems[4].name).toBe("name[][prop2]");
    expect(elems[0].value).toBe("value1");
    expect(elems[1].value).toBe("value2");
    expect(elems[2].value).toBe("value3");
    expect(elems[3].value).toBe("value4");
    expect(elems[4].value).toBe("value5");
  });
});


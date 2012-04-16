jquery-serializeObject
======================

Serializes a form into a Javascript Object.

### Usage ###

Include after jQuery.

```html
  <script src="jquery.js"></script>
  <script src="jquery-serializeObject.js"></script>
```

Following example HTML

```html
  <form id="example">
    <input name="single" value="Single Value" />

    <input name="array[]" value="1"/>
    <input name="array[]" value="2"/>
    <input name="array[]" value="3"/>

    <input name="obj[prop1]" value="1"/>
    <input name="obj[prop2]" value="2"/>
    <input name="obj[prop3]" value="3"/>
  </form>
```

Can be serialized using the $.fn.serializeObject method or by serializing the results from $.fn.serializeArray

```javascript
$( '#example' ).serializeObject();
```

or

```javascript
var arr = $( '#example' ).serializeObject();
$.serializeObject(arr);
```

Returns

```javascript
{
  single: "Single Value",
  array: [1,2,3],
  obj: {
    prop1: 1,
    prop2: 2,
    prop3: 3
  }
}
```

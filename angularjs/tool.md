##angular.bind(self, fn, args)  

* ���ã�����һ���µĺ����������������thisָ��self   
* ����:
    > self���º����������Ķ���  
    > fn����Ҫ�󶨵ĺ���  
    > args�����ݸ������Ĳ���  
* ����ֵ��thisָ��self���º���

```javascript
var obj = {
    name: 'xxx',
	print: function (country) {
		console.log(this.name + ' is form ' + country);
	}
};
var self = {
	name: 'yyy'
};
var bindFn = angular.bind(self, obj.print, 'China');
//var bindFn = angular.bind(self, obj.print, ['China']);
obj.print('American'); //$ xxx is form American
bindFn(); //$ yyy is form China
```
*ע�⣺bind�������Ĳ�����������������call��apply������args������һ�������ݣ�Ҳ������һ������Ŷ��*

##angular.copy(source, [destination])

* ���ã���������
* ������ 
>source��Դ����  
>destination�������Ķ���
* ����ֵ�������Ķ���

```javascript
var obj = {
	name: 'xxx',
	age: 50
};
var copyObj = angular.copy(obj);
console.log(copyObj); //$ Object {name: "xxx", age: 50}
```
##angular.equals(o1, o2)

* ���ã������ȽϺͶ������Ƚ�
* ������ 
>o1���ȽϵĶ���  
>o2���ȽϵĶ���  
* ����ֵ��boolean

```javascript
angular.equals(3, 3); //$ true
angular.equals(NaN,NaN); //$ true
angular.equals({name:'xxx'},{name:'xxx'}); //$ true
angular.equals({name:'xxx'},{name:'yyy'}); //$ false
```
##angular.extend(dst, src)

* ���ã��������չ
* ������ 
>dst����չ�Ķ���  
>src��Դ����  
* ����ֵ����չ�Ķ���

```javascript
var dst = {name: 'xxx', country: 'China'};
var src = {name: 'yyy', age: 10};
angular.extend(dst, src);
console.log(src); //$ Object {name: "yyy", age: 10}
console.log(dst); //$ Object {name: "yyy", country: "China", age: 10}
```
##angular.forEach(obj, iterator, [context])

* ���ã�����ı���
* ������ 
>obj������  
>iterator����������  
>context������������������ 
* ����ֵ��obj

```javascript
var obj = {name: 'xxx', country: 'China'};
angular.forEach(obj, function (value, key) {
	console.log(key + ':' + value);
});
//$ name:xxx
//$ country:China
var array = ['xxx', 'yyy'];
angular.forEach(array, function (item, index) {
	console.log(index + ':' + item + ' form ' + this.country);
}, obj);
//$ 0:xxx form China
//$ 1:yyy form China
```
##angular.fromJson(string)

* ���ã��ַ���תjson����
* ������ 
>string���ַ���
* ����ֵ��json����

```javascript
var json = angular.fromJson('{"name":"xxx","age":34}');

console.log(json); //$ Object {name: "xxx", age: 34}
```

###angular.toJson(json)

* ���ã�json����ת�ַ���
* ������ 
>json��json  
>pretty��boolean number �����ַ��������ʽ  
* ����ֵ���ַ���

```javascript
angular.toJson({name:'xxx'});
//$ "{"name":"xxx"}"

angular.toJson({name:'xxx'},true);
//$ "{
//$    "name": "xxx"
//$ }"

angular.toJson({name:'xxx'},10);
//$ "{
//$            "name": "xxx"
//$ }"
```
##angular.identity(value)

* ���ã�������������ĵ�һ������
* ������ 
>value������  
* ����ֵ����һ������

```javascript
console.log(angular.identity('xxx','yyy')); //$ xxx
```

##angular.isArray(value)

* ���ã��ж�һ�������Ƿ�������
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isArray(3); //$ false
angular.isArray([]); //$ true
angular.isArray([1, 2, 3]); //$ true
angular.isArray({name: 'xxx'}); //$ false
```

##angular.isDate(value)

* ���ã��ж�һ�������Ƿ���Date����
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isDate('2012-12-02'); //$ false
angular.isDate(new Date()); //$ true
```

##angular.isDefined(value)

* ���ã��ж�һ�������Ƿ���defined����
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isDefined(undefined) //$ false
angular.isDefined([]); //$ true
```

##angular.isUndefined(value)

* ���ã��ж�һ�������Ƿ���undefined����
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isUndefined(undefined) //$ true
angular.isUndefined([]); //$ false
```

##angular.isFunction(value)

* ���ã��ж�һ�������Ƿ��Ǻ���
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isFunction(function(){}); //$ true
angular.isFunction(3); //$ false
```

##angular.isNumber(value)

* ���ã��ж�һ�������Ƿ���Number����
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isNumber(4); //$ true
angular.isNumber('xxx'); //$ false
angular.isNumber(new Number(4)); //$ false
angular.isNumber(Number(4)); //$ true
```

##angular.isObject(value)

* ���ã��ж�һ�������Ƿ��Ƕ���
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isObject('xxx'); //$ false      
angular.isObject(null); //$ false
angular.isObject([]); //$ true
angular.isObject(function(){}); //$ false
angular.isObject({name:'xxx'}); //$ true
```

##angular.isString(value)

* ���ã��ж�һ�������Ƿ����ַ���
* ������ 
>value������
* ����ֵ��boolean

```javascript
angular.isString(4); //$ false
angular.isString('xxx'); //$ true
angular.isString(new String('xxx')); //$ false
angular.isString(String('xxx')); //$ true
```

##angular.lowercase(string)

* ���ã����ַ�����д��ĸ��Сд
* ������ 
>string���ַ���
* ����ֵ���ı������ַ���

```javascript
var newString = angular.lowercase('XXyyZZ');
console.log(newString); //$ xxyyzz
```

##angular.uppercase(string)

* ���ã����ַ���Сд��ĸ���д
* ������ 
>string���ַ���
* ����ֵ���ı������ַ���

```javascript
var newString = angular.uppercase('XXyyZZ');
console.log(newString); //$ XXYYZZ
```

##angular.noop()

* ���ã��պ���

```javascript
var flag = false;    
flag ? console.log('xxx') : angular.noop();
```

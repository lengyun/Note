## 对象

js的对象是无序属性的集合，其属性可以包含基本值、对象或者函数。是一组没有特定顺序的值。对象的每个属性或方法都有一个名字，而每个名字都映射到一个值。

### 理解对象

* 属性类型

  * 数据属性

    > [[Configurable]]

    > [[Enumerable]]

    > [[Writable]]

    > [[Value]]

  * 访问器属性

    > [[Configurable]]

    > [[Enumerable]]

    > [[Get]]

    > [[Set]]

  * 修改属性的特性：Object.defineProperty() 

    三个参数：属性所在对象，属性名，描述符对象

    ```javascript
    var person = {};
    Object.definProperty(person,"name",{
      writable:false,
      value:"Nicholas"
    })
    ```

    ​

* 定义多个属性

  ```javascript
  var book = {};
  Object.defineProperties(book,{
    _year:{
      value:2004
    },
    edition:{
      value:1
    },
    year:{
      get:function(){
        return this._year;
      },
      set:function(newValue){
        if(newValue>2004){
          this._year =newValue;
          this.edition += newValue - 2004;
        }
      }
    }
  })
  ```

  > 两个对象参数：要添加的属性所在对象，属性对象

* 读取属性的特性

  > Object.getOwnPropertyDescriptor()
  >
  > 两个参数：属性所在对象，要读取其描述符的属性名称

### 创建对象

* 工厂模式

  ```javascript
  function createPerson(name,age,job){
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function(){
      alert(this.name);
    }
    return o;
  }
  var person1 = createPerson("Nicholas",29,"Software Engineer");
  var person2 = createPerson("chris",32,"Doctor");
  ```

* 构造函数模式

  ```javascript
  function Person(name,age,job){
    this.name=name;
    this.age=age;
    this.job=job;
    this.sayName = function(){
      alert(this.name);
    };
  }
  //当做构造函数使用
  var person1 = new Person("Nicholas",29,"Software Engineer");
  var person2 = new Person("chris",32,"Doctor");
  //作为普通函数调用
  Person("Greg",29,"Software Engineer"); // 添加到window
  window.sayName();//Greg
  //在另一个对象的作用域中调用
  var o =new object();
  Persion.call(o,"kristem",25,"kurse");
  o.sayName(); //kristem
  ```
  > 缺点：每个方法都要在每个实例上重新创建一遍

* 原型模式

  ```javascript
  function Person(){}
  Person.prototype.name = "Nicholas";
  Person.prototype.age = 29;
  Person.prototype.job = "terchear";
  Person.prototype.sayName = function(){
   alert(this.name) 
  };
  var person1 = new Person();
  person1.sayName();//Nicholas
  var person2 = new Person();
  person2.sayName();//Nicholas
  person1.sayName == person2.sayName; //true
  ```

  ​

  * 理解原型对象

    > 创建的每个函数都有一个prototype(原型)属性，这个属性是个指针，指向一个对象。这个对象是通过调用构造函数创建的对象实例的原型对象。使用原型对象可以让所有对象实例共享它所包含的属性和方法。
    >
    > 默认情况下，所有原型对象都会自动获取一个constructor（构造函数）属性，这个属性包含一个指向prototype属性所在函数的指针。

    isPrototypeOf() 方法 判断实例对象是否指向这个构造函数的原型对象

    ```javascript
    Person.prototype.isPrototypeOf(person1) //true
    Person.prototype.isPrototypeOf(person2) //true
    ```

    Object.getPrototypeOf() 方法[ES5] 

    ```javascript
    Object.getPrototypeOf(preson1)==Person.prototype //true
    Object.getPrototypeOf(preson1).name  //"Nicholas"
    ```
    > 读取对象属性时，搜索首先从对象实例本身开始，实例中没有继续搜索指针指向的原型对象.
    >
    > 在实例对象中可以屏蔽原型中的属性访问，恢复的时候删除实例中的属性就行

    hasOwnProperty()方法可检测属性是否存在于实例中，还是原型中。

    ```javascript
    person1.hasOwnProperty("name") //person1的属性返回true
    ```

    Object.getOwnPropertyDescriptor() 方法[es5] 只能用于实例属性

  * 原型与in操作符

* 组合构造函数和原型模式

* 动态原型模式

* 寄生构造函数模式

* 稳妥构造函数模式

### 继承

* 原型链
* 借用构造函数
* 组合继承
* 原型式继承
* 寄生式继承
* 寄生组合式继承
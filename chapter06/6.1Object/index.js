/* 创建对象原始方法 */
var person = new Object();
person.name = "ming";
person.age = 18;
person.sayHello = function (){
  console.log("hello");
}

/* 
  自定义可配置对象,可以通过设置对象属性的下面四个值，实现配置对象
    1.属性
      configurable: 是否可以删除，默认 true
      enumerable: 是否可以通过for-in 遍历 默认 true
      writable: 是否可以重新赋值 默认 true
      Value: 返回的值 默认 undefined
    2.访问属性
      get: 对应一个函数，访问的时候调用, get 函数的返回值为就是属性访问的值
      set: 对应一个函数,设置的时候调用
  Api 
    1.defineProperty中有三个参数
      1: 配置对象
      2: 配置的key
      3: 配置的设置，即 Configurable,Enumerable,Writable,value
  注意key的属性一旦调用defineProperty调用，就不能够进行二次设置
    2. defineProperties,可以一次性配置多个对象的key的描述符号，参数如下
      1.要添加和修改属性的对象
      2.这是一个对象,key是要修改的属性,value是要配置的对象
    3.getOwnPropertyDescriptor()读取属性key的特性
      1.读取的对象
      2.读取的key

*/
var person = {};
person.sex = "女";
person.age = 18;
person.name = "我的天"
Object.defineProperty(person,"sex",{
  value: "阴阳人",
  configurable: false, //不可以删除
  writable: false, //不可以修改
  enumerable: false // 不可以便利
})
console.log(person.sex); //"阴阳人"
person.sex = "男";//configurable: false 设置了不可以修改
console.log(person.sex); //还是阴阳人, 
delete person.sex; //configurable: false 设置了不可以删除

console.log("==============");
console.log("=for-in遍历key=")
for(let key in person){
  console.log(`==   ${key}  ==`); //没有sex,sex 配置了不可以遍历 enumerable: false // 不可以遍历
}
console.log("==============");


/* 2.get set的测试 */

var person2 = {};
person._sex = "男";
console.log(`\n\n/* 2.get set的测试 */`)
Object.defineProperty(person2,"sex",{
  get: function(){
    console.log(111)
    console.log(`其实你是个变性人`);
    return "不男不女";
  },
  set: function(newvalue){
    console.log("变性不是你想变就可以比");
    this._sex = `${newvalue}人妖`;
  }
})

console.log(person2.sex); // 访问sex属性，执行get方法, 打印get的属性值
person2.sex = "女"; //你以为变性就可以成为女的，其实你错了
console.log(person2._sex);

/* 
  3.Object.defineProperties的测试
*/
console.log("\n\n\n Object.defineProperties的测试")
var person3 = {};
Object.defineProperties(person3,{
  sex:{
    value: '男',
  },
  _age:{
    value: 18,
    configurable: false,
  },
  age:{
    get: function(){
      console.log("永远18岁呀呀呀");
      return this._age;
    }
  }
});
person3.age = 19;
console.log(person3.sex,person3.age);


console.log("\n\n\n读取属性对象");
console.log(Object.getOwnPropertyDescriptor(person3,"_age"));
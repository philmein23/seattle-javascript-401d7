var addFive = function(input) {
  input.val += 5;
  return input.val;  
};

var addSeven = function(input) {
  input += 7;
  return input;
};

var addThree = function(input) {
  var val = input.val += 3;
  return val;
};

var myObj = {val: 5};
console.log('addFive: ' + addFive(myObj));
console.log('original: ' + myObj.val);

console.log('addSeven: ' + addSeven(myObj.val));
console.log('original: ' + myObj.val);

console.log('add another five: ' + addFive(Object.create(myObj)));
console.log('original: ' + myObj.val);

console.log('add three: ' + addThree(myObj));
console.log('original: ' + myObj.val);

var anotherObj = myObj;
console.log('add five: ' + addFive(anotherObj));
console.log('another: ' + anotherObj.val);
console.log('original: ' + myObj.val);

console.log('add three: ' + addThree(myObj));
console.log('another: ' + anotherObj.val);
console.log('original: ' + myObj.val);

myObj.val = 1;
console.log('another: ' + anotherObj.val);
console.log('original: ' + myObj.val);

myObj = {val: 5};
console.log('another: ' + anotherObj.val);
console.log('original: ' + myObj.val);

$(function(){
  'use strict';

// global
var result ='';

// on every button click call calculator function with that data-val
$('.btn').each(function(){
  $(this).on('click', function(){
    calculator($(this).attr('data-val'));
  });
});

// if key is pressed
$(document).on('keydown', function(event){
  var keyPressed = event.which;
  var keyVal='';
  switch(keyPressed){
    case 96:
    case 48: keyVal = '0'; break;
    case 97:
    case 49: keyVal = '1'; break;
    case 98:
    case 50: keyVal = '2'; break;
    case 99:
    case 51: keyVal = '3'; break;
    case 100:
    case 52: keyVal = '4'; break;
    case 101:
    case 53: keyVal = '5'; break;
    case 102:
    case 54: keyVal = '6'; break;
    case 103:
    case 55: keyVal = '7'; break;
    case 104:
    case 56: keyVal = '8'; break;
    case 105:
    case 57: keyVal = '9'; break;
    case 110:
    case 190: keyVal = '.'; break;
    case 46: keyVal = 'ac'; break;
    case 107: keyVal = 'add'; break;
    case 109: keyVal = 'substract'; break;
    case 111: keyVal = 'divide'; break;
    case 106: keyVal = 'multiply'; break;
    case 13: keyVal = 'equals';
  }
  console.log('key:'+keyVal);
  $('.btn').filter("[data-val='"+keyVal+"']").addClass('active');
  calculator(keyVal);
  removeActive(keyVal);
});

// remove active class
function removeActive(keyPressed){
  $(document).on('keyup', function(event){
      $('.btn').filter("[data-val='"+keyPressed+"']").removeClass('active');
  });
};


// calculator
function calculator(x) {
  console.log(x);
  // output result in html
  return $('#output').html(getInput(x));
}


function getInput(element){

  switch(element){
    case 'add': result += checkInput('+',result); break;
    case 'substract': result += checkInput('-',result);  break;
    case 'multiply': result += checkInput('*',result);  break;
    case 'divide': result += checkInput('/',result);  break;
    case 'decimal': result += checkInput('.',result);  break;
    case 'equals': result += checkInput('=',result); break;
    case 'Enter': result += checkInput('=',result); break;
    case 'ac': result = ''; break;
    case 'Delete': result = ''; break;
    default: result += element;
  }
  //  console.log(result);
    // if clicked on equals, calculate result,else return result
    if ((element === 'equals'||element ==='Enter')&& result.length !=0)  {result = calculate(result);}
    return result;
}

// checks input so double operators cannot be inputed, or inputed first
function checkInput(element, result){
  //console.log('e:'+element+'re.length'+result.length);
  var testing1 = /[+\-*/=.]/.test(result[result.length-1]);
  if((!testing1)&&(result.length !=0)){
    return element;
  }else if(element == '-' && result.length == 0){
    return element;
  }
  console.log('arithmetic operator already inputed');
  return '';
}

function calculate(str) {
    // vars
    // get arithmetic operators from str
    var operators = str.replace(/[0-9.]/g, '').split('');
    // get numbers from str
    var nums = str.split(/[+\-*/=]/g);
    // delete last empty element (=)
    nums.pop();
    // container variable, if first number is negative
    var sum = str[0] == '-' ? parseFloat(0 - nums[0]) : parseFloat(nums[0]);

    // while numbers elements in nums
    for(var i in nums){
        // do the math,
      if(operators[i-1] == '+'){
        sum += parseFloat(nums[i]);
      } else if(operators[i-1] == '-'){
        sum -= parseFloat(nums[i]);
      } else if(operators[i-1] == '*'){
        sum *= parseFloat(nums[i]);
      } else if(operators[i-1] =='/'){
        sum /= parseFloat(nums[i]);
      }
    }
  // return sum
  return  sum;
}












});

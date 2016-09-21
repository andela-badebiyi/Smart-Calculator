function smartCalculator (arg1, arg2 = null) {
  if (arg2) {
    var variableKeyPair, equation = arg1;
    variableKeyPair = getVariableKeyPair(arg2);

    for (var key in variableKeyPair) {
      if (variableKeyPair.hasOwnProperty(key)) {
        equation = equation.replace(key, variableKeyPair[key]);
      }
    }

    return smartCalculator(equation);
  } else {
    var calcString;
    // run operation in brackets
    if (arg1.includes('(')) {
      calcString = processBracketEquation(arg1);
    }

    // run operations multiplication and division
    calcString = preProcessStr(new RegExp(/[+-]?(\d*\.)?\d+ \/ [+-]?(\d*\.)?\d+/, 'g'), calcString || arg1);
    calcString = preProcessStr(new RegExp(/[+-]?(\d*\.)?\d+ \* [+-]?(\d*\.)?\d+/, 'g'), calcString);

    return calc(calcString);
  }

  function processBracketEquation (ipt) {
    var matchedResults;
    var results = null;

    while(matchedResults = ipt.match(new RegExp(/\((.*?)\)/, 'g'))) {
      var e = matchedResults[0];
      results = ipt = ipt.replace(e, smartCalculator(e.replace(/(\(|\))/g, '')));
    }

    return results || iptStr;
  }

  function preProcessStr (regexp, inputStr) {
    var matchedResults;
    var results = null;

    while(matchedResults = inputStr.match(regexp)) {
      var e = matchedResults[0];
      results = inputStr = inputStr.replace(e, calc(e));
    }

    return results || inputStr;
  }

  function getVariableKeyPair (variables) {
    var pair = {};

    for (var i = 0; i < variables.length; i++) {
      parsedInput = variables[i].split('=');
      pair[parsedInput[0].trim()] = parsedInput[1].trim();
    }

    return pair;
  }

  function calc (inputStr) {
    var parseIpt = inputStr.replace(/(\(|\))/g, '').trim().split(' ');
    var startValue = Number(parseIpt[0]);
    var operator = '';

    for (var i = 1; i < parseIpt.length; i++) {
      var num = Number(parseIpt[i]);
      if (!num) {
        operator = parseIpt[i];
      } else {
        switch (operator) {
          case "+":
            startValue += num;
            break;

          case "-":
            startValue -= num;
            break;

          case "*":
            startValue *= num;
            break;

          case "/":
            startValue /= num;
        }
      }
    }

    return startValue;
  }
}
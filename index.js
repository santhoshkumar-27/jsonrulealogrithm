const rules = [
    {
        "max": 130,
        "min": 80,
        "operator": "between",
        "questionId": "1.7",
        "type": "question"
    },
    {
        "operator": "equals",
        "questionId": "1.2",
        "type": "question",
        "value": "no"
    }
];

// let finalrule = '';
// rules.forEach((ele, i) => {
//     if (ele.hasOwnProperty('operator')) {
//         finalrule += '( '
//         if (ele.operator == 'between') {
//             finalrule += ruleReturn(ele.operator, ele.value, 0, ele.min, ele.max)
//         } else {
//             finalrule += ruleReturn(ele.operator, ele.value, 0)
//         }
//         finalrule += ' )'
//     }
//     if (rules.length -1 != i) {
//         finalrule += ' '
//     }
// });

// console.log(finalrule)

function between(value, min, max) {
    return `${value} >= ${min} && ${value} <= ${max}`
}

function ruleReturn(operatorName, conditionValue, value, min = 0, max = 0) {
    let rule;
    if (operatorName == 'between') {
        rule = between(0, min, max)
    } else {
        rule = `${value} ${convertStringToOpertor(operatorName)} ${conditionValue}`
    }
    return rule;
}

 function convertStringToOpertor(operatorName) {
    let operator;
    switch (operatorName) {
        case 'equals':
            operator = '=='
            break;
        case 'equalsStrict':
            operator = '==='
            break;
        case 'greaterThan':
            operator = '>'
            break;
        case 'greaterThanInclusive':
            operator = '>='
            break;
        case 'greaterThanInclusiveStrict':
            operator = '>=='
            break;
        case 'lessThan':
            operator = '<'
            break;
        case 'lessThanInclusive':
            operator = '<='
            break;
        case 'lessThanInclusiveStrict':
            operator = '<=='
            break;
        case 'anyOf':
            operator = '||'
            break;
        case 'allOf':
            operator = '&&'
            break;

    }
    return operator;
}

module.exports = {
    ruleReturn, convertStringToOpertor
}
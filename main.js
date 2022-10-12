const a = require( "./index.js");

const rules1 = [
    {
        "allOf": [
            {
                "operator": "lessThan",
                "questionId": "1.7",
                "type": "question",
                "value": "70"
            },
            {
                "operator": "equals",
                "questionId": "1.8",
                "type": "question",
                "value": "yes"
            },
            {
                "operator": "equals",
                "questionId": "1.3",
                "type": "question",
                "value": "yes"
            }
        ],
        "anyOf": [
            {
                "operator": "lessThan",
                "questionId": "1.7",
                "type": "question",
                "value": "70"
            },
            {
                "operator": "equals",
                "questionId": "1.8",
                "type": "question",
                "value": "yes"
            },
            {
                "operator": "equals",
                "questionId": "1.3",
                "type": "question",
                "value": "yes"
            }
        ]
    }
];

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

function recursive(data, index, len) {
    if (data.hasOwnProperty('operator')) {
        let finalrule = '';
        finalrule += '( '
        if (data.operator == 'between') {
            finalrule += a.ruleReturn(data.operator, data.value, 0, data.min, data.max)
        } else {
            finalrule += a.ruleReturn(data.operator, data.value, 0)
        }
        finalrule += ' )'
        return finalrule
    } else if (data.hasOwnProperty('allOf') && data.hasOwnProperty('anyOf')) {
        
    } else if (data.hasOwnProperty('allOf')) {
        const allOf = [...data.allOf]
        let allOfrule = '';
        allOf.map((res, i) => {
            allOfrule += recursive(res,i, allOf.length);
            if (allOf.length - 1 != i) {
                allOfrule += ' ';
                allOfrule += a.convertStringToOpertor('allOf')
                allOfrule += ' ';
            }
        });
        return allOfrule;
    } else if (data.hasOwnProperty('anyOf')) {
        const anyOf = [...data.anyOf]
        let anyOfrule = '';
        anyOf.map((res, i) => {
            anyOfrule += recursive(res,i, anyOf.length);
            if (anyOf.length - 1 != i) {
                anyOfrule += ' ';
                anyOfrule += a.convertStringToOpertor('anyOf')
                anyOfrule += ' ';
            }
        });
        return anyOfrule;
    }

}

async function rec(rules01) {
    let vaue = '';
    for (const [index, rule] of rules01.entries()) {
        vaue += await recursive(rule, index, rules01.length);
        if (rules01.length -1 != index) {
            vaue += ' '
        }
    }
    console.log(vaue)
}
rec(rules1);
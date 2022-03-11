const fs = require("fs");
const path = require("path");
const diff = require("deep-diff");
const json2html = require("node-json2html");

const kindType = {
    N: {type: "New", colour: "green"},
    D: {type: "Deleted", colour: "red"},
    E: {type: "Edited", colour: "blue"},
    A: {type: "Array Update", colour: "green"}
};

const templateHeader = {
    "<>": "tr",
    "html": [{
        "<>": "th",
        "html": "Type"
    }, {
        "<>": "th",
        "html": "Key"
    }, {
        "<>": "th",
        "html": "Left"
    }, {
        "<>": "th",
        "html": "Right"
    }]
};

const templateBody = {
    "<>": "tr", "class": "${value.colour}",
    "html": [{
        "<>": "td",
        "html": "${value.kind}"
    }, {
        "<>": "td",
        "html": "${value.path}"
    }, {
        "<>": "td",
        "html": "${value.lhs}"
    }, {
        "<>": "td",
        "html": "${value.rhs}"
    }]
};

const header = `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Configuration</title>
            <style>
                .blue {color:blue}
                .green {color:green}
                .red {color:red}
                .empty {background-color: grey; widht: 100%}

                table, th, td {
                    border: 1px solid black;
                     border-collapse: collapse;
                }
            </style>
        </head>`;

const logDiff = (lhs, rhs, destinationDir, fileName) => {
    let differences = diff(lhs, rhs);
    differences = differences?.map(item => ({
        ...item,
        kind: kindType[item.kind].type,
        colour: kindType[item.kind].colour
    }));
    if (differences?.length > 0) {
        fs.writeFileSync(`${destinationDir}${path.sep}${fileName}.report.html`, getTable(differences, fileName));
    }
};

const getTable = (differences, name) => {
    let diffMap = differences.map(item => ({
        key: item.path[0].split(".")[0],
        value: item        
    }));

    let map = groupBy(diffMap, "key");
    
    let tableHeader = json2html.transform(Object.keys(map)[0][0].value, templateHeader);   
    
    let body = `<body><h2>${name}</h2><br/><table><thead>${tableHeader}</thead>`;

    Object.keys(map).forEach(key => {
        let tableBody = json2html.transform(map[key], templateBody);

        body += `<tr>
                    <td class="empty"></td>
                    <td class="empty"></td>
                    <td class="empty"></td>
                    <td class="empty"></td>
                </tr>
                <tr>${tableBody}</tr>
            
        `;
    });

    body += "</table></body>";


    let html = header + body + '</html>';
    return html;
}

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

module.exports = {
    logDiff
}
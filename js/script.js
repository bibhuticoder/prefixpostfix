var input = document.getElementById('expression');
var output = document.getElementById('output');

document.getElementById('btnCalculate').onclick = function () {
    calculate($("#expression").val());
}

function calculate(input) {

    if (checkSyntax(input)) {
        var postFix = toPostfix(input);
        var postFixsteps = postFix.steps;

        // postfix
        var i;
        var html = '<div><table border="0" id = "outputTable"><tr><td><label class="focus">Scanned Character</label></td><td><label class="focus">PostStack</label></td><td><label class="focus">OpStack</label></td></tr>';
        for (i = 0; i < postFixsteps.length; i++) {
            var splitted = postFixsteps[i].split('|');
            var scannedChar = splitted[0];
            var postStack = splitted[1];
            var opStack = splitted[2];
            html += '<tr><td>' + scannedChar + '</td><td>' + postStack + '</td><td>' + opStack + '</td></tr>';
        }
        html += '</table><br>Postfix: <label>' + postFix.final + '</label></div>';
        document.getElementById('postfixSolution').innerHTML = html;
        html = "";

        // prefix
        var prefix = toPrefix(input);
        var reversedExpression = prefix.reversedExpression;
        var reversedPostfix = prefix.reversedPostfix;
        var prefixSteps = prefix.steps;

        html += '<div>';
        html += 'Reversed Expression: <label class="focus">' + reversedExpression + '</label>';

        html += '<table border="0" id = "outputTable"><tr><td><label class="focus">Scanned Character</label></td><td><label class="focus">PreStack</label></td><td><label class="focus">OpStack</label></td></tr>';
        for (i = 0; i < prefixSteps.length; i++) {
            var splitted = prefixSteps[i].split('|');
            var scannedChar = splitted[0];
            var preStack = splitted[1];
            var opStack = splitted[2];
            html += '<tr><td>' + scannedChar + '</td><td>' + preStack + '</td><td>' + opStack + '</td></tr>';
        }
        html += '</table><br>Prefix: <label class = "focus">' + prefix.prefix + '</label></div>';
        document.getElementById('prefixSolution').innerHTML = html;

        // solution
        var finalAnswer = calculateExpression(postFix.final);
        if (finalAnswer === undefined || isNaN(finalAnswer)) finalAnswer = "....";
        document.getElementById('finalAnswer').innerHTML = "Final Answer : " + finalAnswer;

    } else {
        alert('Syntax error');
    }

}

var testExpression = '[(12*25)+32]/28';
$("#expression").val(testExpression);
console.log(reverse($("#expression").val()));
calculate($("#expression").val());
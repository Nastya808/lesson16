$(document).ready(function() {
    $.getJSON('questions.json', function(data) {
        var container = $('#test-container');
        $.each(data, function(index, question) {
            var questionDiv = $('<div>').addClass('question');
            questionDiv.append($('<p>').text(question.question));
            $.each(question.options, function(i, option) {
                questionDiv.append(
                    $('<label>').append(
                        $('<input>').attr('type', 'radio').attr('name', 'question' + index).attr('value', option),
                        option
                    )
                );
            });
            container.append(questionDiv);
        });
    });

    $('#submit-test').click(function() {
        var answers = [];
        $('.question').each(function(index) {
            var selected = $(this).find('input[type=radio]:checked').val();
            answers.push(selected);
        });

        $.ajax({
            url: 'submit.php',
            type: 'POST',
            data: JSON.stringify({ answers: answers }),
            contentType: 'application/json',
            success: function(result) {
                alert('Поздравляем, ' + result.name + '! Тест сдан на ' + result.score);
            }
        });
    });
});

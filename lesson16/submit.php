<?php
header('Content-Type: application/json');

$questions = json_decode(file_get_contents('questions.json'), true);

$data = json_decode(file_get_contents('php://input'), true);
$submittedAnswers = $data['answers'];

$score = 0;
foreach ($questions as $index => $question) {
    if ($question['answer'] == $submittedAnswers[$index]) {
        $score++;
    }
}

$response = [
    'name' => 'User', 
    'score' => $score
];

echo json_encode($response);
?>

<?php
require_once '../config/db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = htmlspecialchars($data['username']);
$email = htmlspecialchars($data['email']);
$password = password_hash($data['password'], PASSWORD_BCRYPT);

$stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
if ($stmt->execute([$username, $email, $password])) {
    echo json_encode(["message" => "Inscription réussie"]);
} else {
    echo json_encode(["error" => "Échec de l'inscription"]);
}
?>

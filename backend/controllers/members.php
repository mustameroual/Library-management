<?php
require_once '../config/db.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM members");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO members (name, email, phone, status) VALUES (?, ?, ?, ?)");
        $stmt->execute([$data['name'], $data['email'], $data['phone'], $data['status']]);
        echo json_encode(["message" => "Membre ajouté"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE members SET name=?, email=?, phone=?, status=? WHERE id=?");
        $stmt->execute([$data['name'], $data['email'], $data['phone'], $data['status'], $data['id']]);
        echo json_encode(["message" => "Membre mis à jour"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM members WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Membre supprimé"]);
        break;
}
?>

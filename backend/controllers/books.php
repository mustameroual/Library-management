<?php
require_once '../config/db.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM books");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO books (title, author, category, cover_image, description, available) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$data['title'], $data['author'], $data['category'], $data['cover_image'], $data['description'], true]);
        echo json_encode(["message" => "Livre ajouté"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE books SET title=?, author=?, category=?, cover_image=?, description=?, available=? WHERE id=?");
        $stmt->execute([$data['title'], $data['author'], $data['category'], $data['cover_image'], $data['description'], $data['available'], $data['id']]);
        echo json_encode(["message" => "Livre mis à jour"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM books WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Livre supprimé"]);
        break;
}
?>

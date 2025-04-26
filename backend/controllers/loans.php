<?php
require_once '../config/db.php';
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $stmt = $pdo->query("
            SELECT loans.id, members.name AS member_name, books.title AS book_title, loan_date, return_date, status
            FROM loans
            JOIN members ON loans.member_id = members.id
            JOIN books ON loans.book_id = books.id
        ");
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("INSERT INTO loans (book_id, member_id, loan_date, return_date, status) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$data['book_id'], $data['member_id'], $data['loan_date'], $data['return_date'], $data['status']]);
        echo json_encode(["message" => "Emprunt enregistré"]);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare("UPDATE loans SET return_date=?, status=? WHERE id=?");
        $stmt->execute([$data['return_date'], $data['status'], $data['id']]);
        echo json_encode(["message" => "Emprunt mis à jour"]);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $pdo->prepare("DELETE FROM loans WHERE id=?");
        $stmt->execute([$id]);
        echo json_encode(["message" => "Emprunt supprimé"]);
        break;
}
?>

<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "coffee_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Mendapatkan aksi dari query string
$action = $_GET['action'] ?? '';

if ($action == 'register') {
    // Menangani registrasi pengguna
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $phone_number = $input['phone_number'] ?? '';

    if (empty($email) || empty($password) || empty($phone_number)) {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["error" => "Invalid email format"]);
        exit;
    }

    if (!preg_match('/^\d+$/', $phone_number)) {
        echo json_encode(["error" => "Phone number must contain only digits"]);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO users (email, password, phone_number) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $hashedPassword, $phone_number);

    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        echo json_encode(["error" => "Registration failed: " . $stmt->error]);
    }

    $stmt->close();
} elseif ($action == 'login') {
    // Menangani login pengguna
    $input = json_decode(file_get_contents('php://input'), true);
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(["error" => "Email and password are required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, email, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($user = $result->fetch_assoc()) {
        if (password_verify($password, $user['password'])) {
            echo json_encode(["message" => "Login successful", "user" => ["id" => $user['id'], "email" => $user['email']]]);
        } else {
            echo json_encode(["error" => "Invalid email or password"]);
        }
    } else {
        echo json_encode(["error" => "Invalid email or password"]);
    }

    $stmt->close();
} elseif ($action == 'create_address') {
    // Create Address
    $input = json_decode(file_get_contents('php://input'), true);
    $user_id = $input['user_id'] ?? '';
    $address = $input['address'] ?? '';
    $address_detail = $input['address_detail'] ?? '';
    $recipient_name = $input['recipient_name'] ?? '';
    $recipient_phone_number = $input['recipient_phone_number'] ?? '';

    if (empty($user_id) || empty($address) || empty($address_detail) || empty($recipient_name) || empty($recipient_phone_number)) {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO addresses (user_id, address, address_detail, recipient_name, recipient_phone_number) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("issss", $user_id, $address, $address_detail, $recipient_name, $recipient_phone_number);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Address created successfully"]);
    } else {
        echo json_encode(["error" => "Failed to create address: " . $stmt->error]);
    }
    $stmt->close();
} elseif ($action == 'read_address') {
    // Read Address
    $user_id = $_GET['user_id'] ?? '';

    if (empty($user_id)) {
        echo json_encode(["error" => "User ID is required"]);
        exit;
    }

    $stmt = $conn->prepare("SELECT id, address, address_detail, recipient_name, recipient_phone_number FROM addresses WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $addresses = [];
    while ($row = $result->fetch_assoc()) {
        $addresses[] = $row;
    }

    echo json_encode(["addresses" => $addresses]);
    $stmt->close();
} elseif ($action == 'update_address') {
    // Update Address
    $input = json_decode(file_get_contents('php://input'), true);
    $address_id = $input['address_id'] ?? '';
    $address = $input['address'] ?? '';
    $address_detail = $input['address_detail'] ?? '';
    $recipient_name = $input['recipient_name'] ?? '';
    $recipient_phone_number = $input['recipient_phone_number'] ?? '';

    if (empty($address_id) || empty($address) || empty($address_detail) || empty($recipient_name) || empty($recipient_phone_number)) {
        echo json_encode(["error" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare("UPDATE addresses SET address = ?, address_detail = ?, recipient_name = ?, recipient_phone_number = ? WHERE id = ?");
    $stmt->bind_param("ssssi", $address, $address_detail, $recipient_name, $recipient_phone_number, $address_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Address updated successfully"]);
    } else {
        echo json_encode(["error" => "Failed to update address: " . $stmt->error]);
    }
    $stmt->close();
} elseif ($action == 'delete_address') {
    // Delete Address
    $input = json_decode(file_get_contents('php://input'), true);
    $address_id = $input['address_id'] ?? '';

    if (empty($address_id)) {
        echo json_encode(["error" => "Address ID is required"]);
        exit;
    }

    $stmt = $conn->prepare("DELETE FROM addresses WHERE id = ?");
    $stmt->bind_param("i", $address_id);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Address deleted successfully"]);
    } else {
        echo json_encode(["error" => "Failed to delete address: " . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid action"]);
}
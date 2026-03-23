<?php
session_start();

if (isset($_GET['id'])) {

    $product_id = $_GET['id'];

    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = array();
    }

    $_SESSION['cart'][] = $product_id;

    header("Location: index.php");
    exit();
}
?>
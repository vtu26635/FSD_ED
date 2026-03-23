<?php
session_start();

if(isset($_POST['login'])){
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($username == "aishu" && $password == "1234"){
        $_SESSION['user'] = $username;
        header("Location: index.php");
    } else {
        echo "Wrong Username or Password!";
    }
}
?>

<!DOCTYPE html>
<html>

<head>

<link rel="stylesheet" href="style.css">
    <title>Login Page</title>
	<style>
	body{
		text-align:center;
	}
	.box{
		width:300px;
		margin: 100px auto;
        padding: 20px;
        background: linear-gradient(90deg, #6cb8cf, white);;
        box-shadow: 2px 2px 10px;
	}
	</style>
</head>
<body>
<div class ="box">
<h2>Login Page</h2>

<form method="post">
    Username: <input type="text" name="username"><br><br>
    Password: <input type="password" name="password"><br><br>
    <button type="submit" name="login">Login</button>
</form>
</div>

</body>
</html>
<?php
$conn = new mysqli("localhost", "root", "", "ecommerce", 3307);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$result = $conn->query("SELECT * FROM products");
?>
<?php
session_start();

if(!isset($_SESSION['user'])){
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="style.css">
    <title>E-Commerce</title>
    <style>
        body {
            font-family: Arial;
        }
        .product {
            border: 1px solid black;
            padding: 10px;
            margin: 10px;
            width: 200px;
            display: inline-block;
        }
    </style>
</head>
<body>
<div class ="container">
<a href ="cart.php"><b>View Cart</b></a>
<br><br>
<h2>My Products</h2>

<?php while($row = $result->fetch_assoc()) { ?>
   <div class="product">
    <h3>
        <a href="images/<?php echo $row['image']; ?>" target="_blank" style="text-decoration: none; color: #007bff;">
            <?php echo $row['name']; ?>
        </a>
    </h3>
    
    <p>Price: ₹<?php echo $row['price']; ?></p>

		
		
		<a href="add_to_cart.php?id=<?php echo $row['id']; ?>">
        <button class="add-btn" data-name="<?php echo $row['name']; ?>" data-price="<?php echo $row['price']; ?>">Add to Cart</button>
</a>
    </div>
<?php } ?>
</div>


<script>
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            
            cart.push({ name: name, price: price });
            localStorage.setItem('myCart', JSON.stringify(cart));
            
            alert(name + " added to cart!");
        });
    });
</script>

</body>
</html>
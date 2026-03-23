<?php
session_start();
$conn = new mysqli("localhost", "root", "", "ecommerce",3307);

?>
<?php
// We no longer need session_start() or database queries here 
// because we are using the browser's LocalStorage.
?>
<!DOCTYPE html>
<html>
<head>
    <title>My Cart</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Your Shopping Cart</h2>
        <div id="cart-display"></div>
        <h3 id="total-price">Total: ₹0</h3>
        <a href="index.php"><b>Back to Shopping</b></a>
    </div>

    <script>
        function renderCart() {
            const cart = JSON.parse(localStorage.getItem('myCart')) || [];
            const display = document.getElementById('cart-display');
            let total = 0;
            
            display.innerHTML = cart.length === 0 ? "Your cart is empty" : "";
            
            cart.forEach((item, index) => {
                display.innerHTML += `
                    <div style="
                    background: linear-gradient(90deg, white, #5fabc3);
                    border-radius:15px;
                    padding:20px;
                    margin:20px auto;
                    width:70%;
                    box-shadow:0 15px 35px rgba(0,0,1,0.3);
                    backdrop-filter:blur(6px);
                    transition:0.3s;
                    ">
                        <h4>${item.name}</h4>
                        <p>Price: ₹${item.price}</p>
                        <button onclick="remove(${index})">Remove</button>
                    </div>`;
                total += parseInt(item.price);
            });
            document.getElementById('total-price').innerText = "Total: ₹" + total;
        }

        function remove(index) {
            let cart = JSON.parse(localStorage.getItem('myCart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('myCart', JSON.stringify(cart));
            renderCart();
        }

        renderCart();
    </script>
</body>
</html>
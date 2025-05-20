let cart = [];
let total = 0;

function addToCart(productName, price) {
  cart.push({ name: productName, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total.toFixed(2);
}

function makePayment() {
  FlutterwaveCheckout({
    public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
    tx_ref: "txn-" + Date.now(),
    amount: total,
    currency: "USD",
    payment_options: "card, mobilemoney, ussd",
    customer: {
      email: "customer@email.com",
      phonenumber: "1234567890",
      name: "Customer Name",
    },
    callback: function (data) {
      alert("Payment complete! Reference: " + data.tx_ref);
    },
    onclose: function () {
      console.log("closed");
    },
    customizations: {
      title: "Supermarket Checkout",
      description: "Payment for items in cart",
      logo: "https://yourdomain.com/logo.png",
    },
  });
}

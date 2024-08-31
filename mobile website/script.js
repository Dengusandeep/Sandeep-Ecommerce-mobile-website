document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const addToCartButtons = document.querySelectorAll('.product-card button:first-of-type');
    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('h2').textContent;
            const productPrice = productCard.querySelector('.price').textContent.replace('₹', '').replace(',', '');
            const productImg = productCard.querySelector('img').src;

            const existingProduct = cart.find(item => item.title === productTitle);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ title: productTitle, price: parseFloat(productPrice), img: productImg, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productTitle} added to cart.`);
        });
    });

    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        displayCart(cart);
    }

    function displayCart(cart) {
        cartContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach(function (item, index) {
            const total = item.price * item.quantity;
            subtotal += total;

            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td><img src="${item.img}" alt="${item.title}" class="cart-img"></td>
                <td>${item.title}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>₹${total.toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            `;
            cartContainer.appendChild(cartRow);
        });

        document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('cart-total').textContent = subtotal.toFixed(2);
    }

    window.removeFromCart = function (index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart(cart);
    };

    window.checkout = function () {
        alert('Proceeding to checkout...');
        // You can add more checkout logic here.
    };

    // Review functionality for the product page
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function (card) {
        const reviewSection = document.createElement('div');
        reviewSection.classList.add('review-section');
        reviewSection.innerHTML = `
            <h3>Leave a Review</h3>
            <input type="text" placeholder="Your Name" required>
            <textarea placeholder="Your Review" required></textarea>
            <button class="submit-review">Submit Review</button>
            <div class="reviews-container"></div>
        `;
        card.appendChild(reviewSection);

        const submitReviewButton = reviewSection.querySelector('.submit-review');
        submitReviewButton.addEventListener('click', function () {
            const name = reviewSection.querySelector('input').value;
            const review = reviewSection.querySelector('textarea').value;
            const reviewContainer = reviewSection.querySelector('.reviews-container');

            if (name && review) {
                const reviewItem = document.createElement('div');
                reviewItem.classList.add('review-item');
                reviewItem.innerHTML = `<strong>${name}</strong>: ${review}`;
                reviewContainer.appendChild(reviewItem);

                reviewSection.querySelector('input').value = '';
                reviewSection.querySelector('textarea').value = '';
            } else {
                alert('Please fill out both fields.');
            }
        });
    });

    const images = document.querySelectorAll('.product-card img');
    images.forEach(function (img) {
        img.addEventListener('mouseover', function () {
            img.style.transform = 'scale(1.5)';
        });

        img.addEventListener('mouseout', function () {
            img.style.transform = 'scale(1)';
        });
    });
});



// script.js

// Function to display payment methods
function displayPaymentMethods() {
    document.getElementById('payment-methods').style.display = 'block';
}

// Function to handle payment and show order details
function payNow() {
    // Hide payment methods section
    document.getElementById('payment-methods').style.display = 'none';

    // Show order details section
    document.getElementById('order-details').style.display = 'block';

    // Simulate order tracking details (you'd typically fetch these from a server)
    document.getElementById('order-tracking').style.display = 'block';
}

// Add functionality to update order tracking (if needed)
function updateOrderTracking(trackingNumber, status) {
    document.getElementById('tracking-number').textContent = trackingNumber;
    document.getElementById('order-status').textContent = status;
}
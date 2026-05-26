let cart = [];

function rendermodal() {
    const modal = document.querySelector('.modal');
    modal.style.display = 'flex';

    const modalItemsContainer = modal.querySelector('.modal-items');
    const modalTotal = modal.querySelector('.modal-total');

    cart.forEach(item => {
        const modalItem = document.createElement('div');
        modalItem.classList.add('modal-item');

        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        itemName.classList.add('modal-item-name');

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `${item.quantity}x`;
        itemQuantity.classList.add('modal-item-quantity');

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `@$${item.price.toFixed(2)}`;
        itemPrice.classList.add('modal-item-price');

        const itemImage = document.createElement('img');
        itemImage.src = item.image.src;
        itemImage.classList.add('modal-item-image');

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('modal-item-details');
        itemDetails.appendChild(itemQuantity);
        itemDetails.appendChild(itemPrice);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('modal-item-info');
        itemInfo.appendChild(itemName);
        itemInfo.appendChild(itemDetails);

        modalItem.appendChild(itemImage);
        modalItem.appendChild(itemInfo);        

        modalItemsContainer.appendChild(modalItem);

        const modalTotalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
        modalTotal.textContent = `$${modalTotalAmount}`;

        });

        

        const startNewOrderButton = modal.querySelector('.start-new-order-button');
        startNewOrderButton.addEventListener('click', () => {
            cart = [];
            modal.style.display = 'none';
            renderCart();
        });


    }

function renderCart() {

    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = '';
    cartContainer.style.display = cart.length > 0 ? 'block' : 'none';

    const cartTitle = document.createElement('h2');
    cartTitle.textContent = `Your Cart (${cart.reduce((total, item) => total + item.quantity, 0)})`;
    cartTitle.classList.add('cart-title');
    cartContainer.appendChild(cartTitle);

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemName = document.createElement('p');
        itemName.textContent = item.name;
        itemName.classList.add('cart-item-name');

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `${item.quantity}x`;
        itemQuantity.classList.add('cart-item-quantity');

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `@$${item.price.toFixed(2)}`;
        itemPrice.classList.add('cart-item-price');

        const itemTotal = document.createElement('p');
        itemTotal.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
        itemTotal.classList.add('cart-item-total');

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('cart-item-details');
        itemDetails.appendChild(itemQuantity);
        itemDetails.appendChild(itemPrice);
        itemDetails.appendChild(itemTotal);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = `<img src="assets/images/icon-remove-item.svg" alt="Remove">`;
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', () => {
            const removed = cart.find(cartItem => cartItem.name === item.name);
            removed.button.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart"> Add to Cart`;
            removed.button.style.backgroundColor = '';
            removed.image.style.border = '';
            removed.image.style.transform = '';
            removed.button.style.color = '';
            removed.reattachListeners();

            cart = cart.filter(cartItem => cartItem.name !== item.name);
            renderCart();
            attachAddToCartListeners();
        });

        

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemDetails);
        cartItem.appendChild(removeButton);

        const divider = document.createElement('hr');
        cartItem.appendChild(divider);

        cartContainer.appendChild(cartItem);

        
    });

    const cartTotalText = document.createElement('p');
    cartTotalText.textContent = 'Order Total';
    cartTotalText.classList.add('cart-total-text');

    const cartTotalAmount = document.createElement('p');
    cartTotalAmount.textContent = `$${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`;
    cartTotalAmount.classList.add('cart-total-amount');

    const cartTotalWrapper = document.createElement('div');
    cartTotalWrapper.classList.add('cart-total-wrapper');
    cartTotalWrapper.appendChild(cartTotalText);
    cartTotalWrapper.appendChild(cartTotalAmount);

    cartContainer.appendChild(cartTotalWrapper);

    const carbonNeutralIcon = document.createElement('img');
    carbonNeutralIcon.src = 'assets/images/icon-carbon-neutral.svg';
    carbonNeutralIcon.alt = 'Carbon Neutral Icon';
    carbonNeutralIcon.classList.add('carbon-neutral-icon');

    const carbonNeutralText = document.createElement('p');
    carbonNeutralText.innerHTML = 'This is a <b>carbon-neutral</b> delivery.';
    carbonNeutralText.classList.add('carbon-neutral-text');

    const carbonNeutralWrapper = document.createElement('div');
    carbonNeutralWrapper.classList.add('carbon-neutral-wrapper');
    carbonNeutralWrapper.appendChild(carbonNeutralIcon);
    carbonNeutralWrapper.appendChild(carbonNeutralText);

    cartContainer.appendChild(carbonNeutralWrapper);

    const confirmOrderButton = document.createElement('button');
    confirmOrderButton.textContent = 'Confirm Order';
    confirmOrderButton.classList.add('confirm-order-button');

    confirmOrderButton.addEventListener('click', () => {
        rendermodal();
    });

    cartContainer.appendChild(confirmOrderButton);
}


fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {

            var productWrapper = document.createElement('div');
            productWrapper.classList.add('product-wrapper');

            const productImage = document.createElement('img');
            productImage.src = product.image.desktop;
            productImage.classList.add('product-image')

            const addToCartButton = document.createElement('button');
            addToCartButton.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart"> Add to Cart`;
            addToCartButton.classList.add('add-to-cart-button');

            function attachAddToCartListeners() {

                addToCartButton.addEventListener('click', () => {                   

                    addToCartButton.innerHTML = `
                        <button class="decrease"><img src="assets/images/icon-decrement-quantity.svg" alt="Decrease"></button>
                        <p class="quantity">1</p>
                        <button class="increase"><img src="assets/images/icon-increment-quantity.svg" alt="Increase"></button>
                        `;

                    cart.push({
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        button: addToCartButton,
                        image: productImage,
                        reattachListeners: attachAddToCartListeners
                    });

                    renderCart();

                    console.log(cart);

                    addToCartButton.style.backgroundColor = '#D87D4A';
                    addToCartButton.style.color = '#FFFFFF';
                    addToCartButton.style.justifyContent = 'space-between';
                    productImage.style.border = '3px solid #D87D4A';
                    imageWrapper.style.transform = 'scale(0.95)';
                    imageWrapper.style.transition = 'transform 0.3s ease, border 0.3s ease';
                
                    const decreaseButton = addToCartButton.querySelector('.decrease');
                    const increaseButton = addToCartButton.querySelector('.increase');
                    const quantityElement = addToCartButton.querySelector('.quantity'); 

                    let quantity = 1;

                    const cartItem = cart.find(item => item.name === product.name);

                    decreaseButton.addEventListener('click', (event) => {
                        if (quantity > 1) {
                            quantity--;
                            quantityElement.textContent = quantity;
                            cartItem.quantity = quantity;
                            renderCart();
                            console.log(cart);
                        } else {
                            addToCartButton.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart"> Add to Cart`;
                            addToCartButton.style.backgroundColor = '';
                            addToCartButton.style.color = '';
                            productImage.style.border = '';
                            productImage.style.transform = '';
                            cart = cart.filter(item => item.name !== product.name);
                            console.log(cart);
                            renderCart();

                            attachAddToCartListeners();
                            event.stopPropagation();
                        }
                    });

                    increaseButton.addEventListener('click', () => {
                        quantity++;
                        quantityElement.textContent = quantity;
                        cartItem.quantity = quantity;
                        console.log(cart);
                        renderCart();
                    });
                }, {once: true});
            }

            attachAddToCartListeners();

            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('image-wrapper');
            imageWrapper.appendChild(productImage);
            imageWrapper.appendChild(addToCartButton);

            const productCategory = document.createElement('p');
            productCategory.textContent = product.category;
            productCategory.classList.add('product-category');

            const productName = document.createElement('p');
            productName.textContent = product.name;
            productName.classList.add('product-name');

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price.toFixed(2)}`;
            productPrice.classList.add('product-price');

            const productTextWrapper = document.createElement('div');
            productTextWrapper.classList.add('product-text-wrapper');

            productTextWrapper.appendChild(productCategory);
            productTextWrapper.appendChild(productName);
            productTextWrapper.appendChild(productPrice);

            productWrapper.appendChild(imageWrapper);
            productWrapper.appendChild(productTextWrapper);

            document.querySelector('.product-list').appendChild(productWrapper);

        });
    }   
)
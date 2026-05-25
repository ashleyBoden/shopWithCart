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
                    addToCartButton.style.backgroundColor = '#D87D4A';
                    addToCartButton.style.color = '#FFFFFF';
                
                    const decreaseButton = addToCartButton.querySelector('.decrease');
                    const increaseButton = addToCartButton.querySelector('.increase');
                    const quantityElement = addToCartButton.querySelector('.quantity'); 

                    let quantity = 1;

                    decreaseButton.addEventListener('click', (event) => {
                        if (quantity > 1) {
                            quantity--;
                            quantityElement.textContent = quantity;
                        } else {
                            addToCartButton.innerHTML = `<img src="assets/images/icon-add-to-cart.svg" alt="Add to Cart"> Add to Cart`;
                            addToCartButton.style.backgroundColor = '';
                            addToCartButton.style.color = '';
                            attachAddToCartListeners();
                            event.stopPropagation();
                        }
                    });

                    increaseButton.addEventListener('click', () => {
                        quantity++;
                        quantityElement.textContent = quantity;
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


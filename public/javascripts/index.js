$(document).ready(function() {

    let getProducts = function(limit) {
        $.ajax({
            url: '/API/getProducts',
            type: 'GET',
            data: {
                limit: limit
            },
            success: function(data) {
                console.log(data);
                projectProducts(data);
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    let projectProducts = function(products) {
        let rows = Math.ceil(products.length / 3);

        for (let i = 0; i < rows; i++) {
            // add row container
            let row = $('<div class="products-row"></div>');
            let row_length = (products.length - (i * 3) > 3 ? 3 : products.length - (i * 3));
            console.log("Row Length > " + row_length);
            for (let j = 0; j < row_length; j++) {
                // add product
                let k = (i * 3) + j; // position in products array
                let product = products[k];
                let product_div = $(`
                    <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
                        <div class="flipper">
                            <div class="product front">
                                <img class="product-img" src="./products/${product["id"]}/img.jpg">
                                <span class="product-title">${product["TITLE"]}</span>
                                <span class="product-desc">${product["DESC"]}</span>
                            </div>
                            <div class="back">
                                <span class="price-est">Price Per = <span class="price-per-pos">$${product["PRICE"]}</span></span>
                                <div>
                                    <span>Quantity</span>
                                    <div class="ticker">
                                        <button class="tick">
                                            <span>-</span>
                                        </button>
                                        <input class="quantity-input" type="number" max="100" min="1" value="1">
                                        <button class="tick">
                                            <span>+</span>
                                        </button>
                                    </div>
                                </div>
                                <span class="price-est">Total Price = <span class="price price-est-pos">$${product["PRICE"]}</span> </span>
                                <button type="button" class="btn btn-primary">Add to cart!</button>
                            </div>
                        </div>
                    </div>`);
                row.append(product_div);
            }
            $("#products-container").append(row);
        }

        $('.quantity-input').on('change', function() {
            let val = $(this).val();
            if (val > 100) {
                $(this).val(100);
            } else if (val < 1) {
                $(this).val(1);
            }
            let back_div = $(this).parent().parent().parent();
            update_price(back_div);
        });

        $('.tick').on('click', function() {
            let input = $(this).parent().find('input');
            let val = parseInt(input.val());
            let span_text = $(this).find('span').text();
            if (span_text == "-" && val > 1) {
                input.val(val - 1);
            } else if (span_text == "+" && val < 100) {
                input.val(val + 1);
            }
            let back_div = $(this).parent().parent().parent();
            update_price(back_div);
        });
    }

    let update_price = function(back_div) {
        let price = parseInt(back_div.find(".price-per-pos").text().replace("$", ""));
        let quantity = parseInt(back_div.find(".quantity-input").val());
        let est = price * quantity;
        back_div.find(".price-est-pos").text("$" + est);
    }

    getProducts(10);

});
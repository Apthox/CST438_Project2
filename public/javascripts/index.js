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
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    getProducts(10);

});
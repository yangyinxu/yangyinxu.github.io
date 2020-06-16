//empty the cart
let empty = document.querySelector(".btn-danger")
    empty.addEventListener("click", function(){
        // alert("Your Shopping Cart has been cleared");
        localStorage.clear();
        location.reload();
});
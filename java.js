// la fonction de mélange

function emoji() {
    const container = document.getElementById('cart_container');
    const cart = Array.from(container.children)
    for (let i=0; i< cart.length; i++  ){
        let j = Math.floor(Math.random()*(i-1));
        container.insertBefore (cart[i],cart[j]);
    }
}

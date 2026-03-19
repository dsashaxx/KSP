let cart = [];
const savedCart = localStorage.getItem("cart");
if (savedCart) {
    cart = JSON.parse(savedCart);
}
function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, category) {
    let found = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].category === category) {
            cart[i].count++;
            found = true;
            break;
        }
    }
    if (!found) {
        cart.push({ name: name, price: Number(price), category: category, count: 1 });
    }
    saveToLocalStorage();
    show();
}

const show = () => {
    const cr = document.getElementById("cart");
    cr.innerHTML = '';
    
    if (cart.length === 0) {
        cr.innerHTML = '<p>Корзина пуста</p>';
    } else {
        for (let i = 0; i < cart.length; i++) {
            let item = document.createElement('div');
            item.className = 'cart-item';
            item.innerHTML = cart[i].name + ' - ' + cart[i].count + ' шт.  = ' + (cart[i].count * cart[i].price) + ' р <button onclick="del(' + i + ')">х</button>';
            cr.appendChild(item);
        }
    }
    document.getElementById("total").textContent = calculateTotal();
};

function calculateTotal() {
    let total = 0;
    cart.forEach(function(item) {
        total += item.price * item.count;
    });
    return total;
}

function del(index) {
    cart.splice(index, 1);
    saveToLocalStorage();
    show();
}

const clearCart = () => {
    cart = [];
    saveToLocalStorage();
    show();
};


const pay = () => {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Оплата прошла успешно!");
        cart = [];
        saveToLocalStorage();
        show();
    }
};

function filterByPrice(value) {
    var c = document.querySelectorAll(".product");
    for (var i = 0; i < c.length; i++) {
        var price = c[i].getAttribute("data-price");
        price = Number(price);
        var show = false;
        if (value === "all") {
            show = true;
        }
        else if (value === "low") {
            if (price >= 80 && price <= 150) {
                show = true;
            }
        }
        else if (value === "medium") {
            if (price >= 151 && price <= 200) {
                show = true;
            }
        }
        else if (value === "high") {
            if (price >= 201 && price <= 300) {
                show = true;
            }
        }
        if (show === true) {
            c[i].style.display = "block";
        } else {
            c[i].style.display = "none";
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    show();
    
    document.querySelectorAll(".btn").forEach(btn => {
        btn.onclick = function() {
            const c = this.closest(".product");
            const name = c.getAttribute("data-name");
            const price = c.getAttribute("data-price");
            const category = c.getAttribute("data-category");
            addToCart(name, price, category);
        };
    });
    
    document.querySelector(".clear").onclick = clearCart;
    document.querySelector(".pay").onclick = pay;
    document.getElementById("filter-price").onchange = (e) => filterByPrice(e.target.value);
});
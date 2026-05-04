const products = [
    { name: "Малък дюнер", price: 3.00, cat: "doner", img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=2070" },
    { name: "Голям дюнер", price: 4.50, cat: "doner", img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=1964" },
    { name: "Класик Бургер", price: 5.00, cat: "burger", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899" },
    { name: "Чийзбургер", price: 5.50, cat: "burger", img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2015" },
    { name: "Дюнер порция", price: 7.50, cat: "portion", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887" },
    { name: "Порция Кюфтета", price: 7.00, cat: "portion", img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070" }
];

let cart = [];
let currentProduct = null;

function renderMenu(filter = 'all') {
    const container = document.getElementById("menuItems");
    container.innerHTML = "";
    
    const filtered = filter === 'all' ? products : products.filter(p => p.cat === filter);

    filtered.forEach(p => {
        container.innerHTML += `
            <div class="item">
                <img src="${p.img}" class="item-img" alt="${p.name}">
                <div class="item-info">
                    <h3>${p.name}</h3>
                    <p class="price">${p.price.toFixed(2)} €</p>
                    <button class="add-btn" onclick="openOptions('${p.name}', ${p.price})">ДОБАВИ</button>
                </div>
            </div>
        `;
    });
}

function filterCategory(cat, btn) {
    // Премахваме active класа от всички бутони в главната навигация на менюто
    document.querySelectorAll('.category-nav button').forEach(b => b.classList.remove('active'));
    
    // Ако функцията е извикана от бутон (а не от линк в падащото меню), добавяме active
    if(btn.tagName === 'BUTTON') {
        btn.classList.add('active');
    }
    
    renderMenu(cat);
}

function openOptions(name, price) {
    currentProduct = { name, price };
    document.getElementById("modalTitle").innerText = name;
    document.getElementById("optionsModal").style.display = "block";
}

function closeModal() {
    document.getElementById("optionsModal").style.display = "none";
}

function confirmAdd() {
    const extras = [];
    document.querySelectorAll('#extraOptions input:checked').forEach(cb => {
        extras.push(cb.value);
        cb.checked = false;
    });

    let name = currentProduct.name;
    if (extras.length > 0) name += " (" + extras.join(", ") + ")";

    cart.push({ name, price: currentProduct.price });
    updateUI();
    closeModal();
    if(!document.getElementById("cartSidebar").classList.contains("active")) toggleCart();
}

function updateUI() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        list.innerHTML += `
            <li>
                <span>${item.name}</span>
                <span>${item.price.toFixed(2)} € <button onclick="remove(${i})" style="color:red; background:none; border:none; cursor:pointer;">✕</button></span>
            </li>
        `;
        total += item.price;
    });

    document.getElementById("totalPrice").innerText = total.toFixed(2);
    document.getElementById("cartCount").innerText = cart.length;
}

function remove(i) {
    cart.splice(i, 1);
    updateUI();
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}

function processOrder() {
    if(cart.length === 0) return alert("Количката е празна!");
    alert("Поръчката е приета! Благодарим ви!");
    cart = [];
    updateUI();
    toggleCart();
}

// Затваряне на модал при клик извън него
window.onclick = (e) => { if(e.target == document.getElementById("optionsModal")) closeModal(); }

renderMenu();
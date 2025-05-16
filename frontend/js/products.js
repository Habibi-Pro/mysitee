document.addEventListener("DOMContentLoaded", () => {
  // دریافت و نمایش محصولات
  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('products');
      if (products.length === 0) {
        container.innerHTML = "<p>هیچ محصولی یافت نشد.</p>";
        return;
      }
      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product["image"]}" alt="${product["نام_محصول"]}">
          <h3>${product["نام_محصول"]}</h3>
          <p>تعداد فروخته شده: ${product["تعداد_فروخته_شده"]}</p>
          <p>موجودی: ${product["موجودی"]}</p>
          <p>تخفیف: ${product["تخفیف"]}</p>
          <p>قیمت اصلی: ${product["قیمت_اصلی_افغانی"]}</p>
          <p>قیمت تخفیف خورده: ${product["قیمت_تخفیف_خورده_افغانی"]}</p>
          <button class="buy-btn">خرید</button>
          <button class="add-to-cart-btn">افزودن به سبد خرید</button>
        `;
        container.appendChild(card);
      });

      // افزودن به سبد خرید
      document.querySelectorAll('.add-to-cart-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
          addToCart(products[index]);
        });
      });
    })
    .catch(error => {
      console.error('خطا در بارگذاری داده‌ها:', error);
      const container = document.getElementById('products');
      container.innerHTML = "<p>مشکلی در بارگذاری محصولات به وجود آمده است.</p>";
    });

  // سبد خرید
  const cartItemsList = document.getElementById("cartItems");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    if (cartItemsList) {
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item["نام_محصول"]} - ${item["قیمت_تخفیف_خورده_افغانی"]} افغانی`;
        cartItemsList.appendChild(li);
      });
    }
  }

  updateCartUI(); // بارگذاری اولیه سبد خرید
});

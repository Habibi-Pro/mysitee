document.addEventListener("DOMContentLoaded", () => {
  // دریافت و نمایش محصولات
  fetch('/products/')
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

  // چت باکس باز و بسته
  const chatBtn = document.getElementById('chat-button');
  const chatBox = document.getElementById('chat-box');
  if (chatBtn && chatBox) {
    chatBtn.addEventListener('click', () => {
      // تغییر حالت نمایش چت‌باکس
      chatBox.style.display = (chatBox.style.display === "flex") ? "none" : "flex";
    });
  }

  // ورود و ثبت‌نام
  const registerBtn = document.getElementById("registerBtn");
  const loginBtn = document.getElementById("loginBtn");
  const authMessage = document.getElementById("authMessage");

  if (registerBtn) {
    registerBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        authMessage.textContent = "لطفاً نام کاربری و رمز را وارد کنید.";
        return;
      }

      localStorage.setItem("user", JSON.stringify({ username, password }));
      localStorage.setItem("loggedInUser", username);
      authMessage.textContent = "ثبت‌نام موفقیت‌آمیز بود!";
      window.location.href = "index.html"; // رفتن به صفحه اصلی
    });
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.username === username && user.password === password) {
        localStorage.setItem("loggedInUser", username);
        authMessage.textContent = "ورود موفقیت‌آمیز!";
        window.location.href = "index.html"; // رفتن به صفحه اصلی
      } else {
        authMessage.textContent = "نام کاربری یا رمز اشتباه است.";
      }
    });
  }

  // نمایش وضعیت ورود و دکمه خروج
  const userInfoDiv = document.getElementById("userInfo");
  const userGreeting = document.getElementById("userGreeting");
  const authMenu = document.getElementById("authMenu");
  const registerLink = document.querySelector('a[href="register.html"]');
  const loginLink = document.querySelector('a[href="login.html"]');
  const user = localStorage.getItem("loggedInUser");

  if (user) {
    // نمایش سلام و نام کاربر
    if (userGreeting) userGreeting.textContent = `سلام، ${user}`;
    if (authMenu) authMenu.classList.add("hidden");
    if (registerLink) registerLink.style.display = "none";
    if (loginLink) loginLink.style.display = "none";

    if (userInfoDiv) {
      userInfoDiv.innerHTML = `
        <img src="images/user-icon.png" class="user-icon" alt="کاربر">
        <span id="userGreeting">سلام، ${user}</span>
        <button id="logoutBtn" style="margin-right:10px;">خروج</button>
      `;
    }

    // عملکرد دکمه خروج
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      });
    }
  } else {
    if (userInfoDiv) {
      userInfoDiv.addEventListener("click", () => {
        if (authMenu) authMenu.classList.toggle("hidden");
      });
    }
  }

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








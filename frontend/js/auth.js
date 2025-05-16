// تبدیل رمز عبور به SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  // ثبت‌نام
  document.getElementById('registerBtn')?.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword')?.value;
  
    if (!username || !password || (confirmPassword && password !== confirmPassword)) {
      alert('اطلاعات ثبت‌نام ناقص یا نادرست است.');
      return;
    }
  
    if (localStorage.getItem(`user_${username}`)) {
      alert('این نام کاربری قبلاً ثبت شده است.');
      return;
    }
  
    const hashed = await hashPassword(password);
    localStorage.setItem(`user_${username}`, hashed);
    localStorage.setItem("loggedInUser", username);
    alert('ثبت‌نام موفق بود.');
    window.location.href = "index.html";
  });
  
  // ورود
  document.getElementById('loginBtn')?.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
  
    const savedHash = localStorage.getItem(`user_${username}`);
    if (!savedHash) {
      alert("کاربر یافت نشد.");
      return;
    }
  
    const hashed = await hashPassword(password);
    if (hashed !== savedHash) {
      alert("رمز عبور اشتباه است.");
      return;
    }
  
    localStorage.setItem("loggedInUser", username);
    alert(`خوش آمدی ${username}`);
    window.location.href = "index.html";
  });
  
// منتظر می‌مانیم که تمام محتوا بارگذاری شود
document.addEventListener("DOMContentLoaded", function() {
  const loginIcon = document.getElementById('loginIcon');

  // اگر آیکون موجود بود، event listener را اضافه کن
  if (loginIcon) {
    loginIcon.addEventListener('click', function() {
      // هدایت به صفحه ورود
      window.location.href = 'login.html';
    });
  }
});


  

  
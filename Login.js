// تنظیمات اولیه صفحه
let button = document.querySelector(".submit");

button.addEventListener("click", (e) => {
  let u = document.querySelector(".user_n");
  let p = document.querySelector(".user_p");

  let username = u.value;
  let password = p.value;

  // بررسی نام کاربری خالی
  if (username.trim() == "") {
    alert("نام کاربری را وارد کنید");
    console.log(username);
    console.log(password);
    u.value = "";

  // بررسی رمز عبور خالی
  } else if (password.trim() == "") {
    alert("رمز را وارد کنید");
    console.log(username);
    console.log(password);
    p.value = "";

  // بررسی طول نام کاربری و رمز عبور
  } else if (username.length <= 4 || password.length <= 6) {
    alert("نام کاربری باید بیش از 4 و رمز عبور بیش از 6 کاراکتر باشد");
    console.log(username);
    console.log(password);
    u.value = "";
    p.value = "";

  // بررسی اینکه نام کاربری حداقل یک حرف بزرگ و رمز حداقل یک عدد داشته باشد
  } else if (!/[A-Z]/.test(username) || !/\d/.test(password)) {
    alert("نام کاربری باید حداقل یک حرف بزرگ و رمز حداقل یک عدد داشته باشد");
    console.log(username);
    console.log(password);
    u.value = "";
    p.value = "";

  // ورود موفق
  } else {
    alert("وارد شدید ;)");
    console.log(username);
    console.log(password);

    e.preventDefault();
    window.location.href = "MainPage.html";
  }
});


//responsive
document.addEventListener("DOMContentLoaded", function () {
  const loginlight = document.querySelector(".login-light");
  const toggleSwitch = document.getElementById("input-check");
  const body = document.body;
  const loginBox = document.querySelector(".login-box");
  const labels = document.querySelectorAll(".input-group label");
  const inputs = document.querySelectorAll(".input-group input");
  const button = document.querySelector(".submit");
  const texts = document.querySelectorAll(".toggle .text");

  function updateTheme() {
    if (toggleSwitch.checked) {
      loginlight.style.background = "#1B1F3B";
      body.style.background = "#3B82F6";
      loginBox.style.background = "#EAEAEA";
      labels.forEach((label) => (label.style.color = "#1B1F3B"));
      inputs.forEach((input) => (input.style.color = "#1B1F3B"));
      button.style.background = "#1B1F3B";
      button.style.color = "#EAEAEA";
      texts[0].style.opacity = "0";
      texts[1].style.opacity = "1";
    } else {
      loginlight.style.background = "#3B82F6";
      body.style.background = "#1B1F3B";
      loginBox.style.background = "#2A2E5E";
      labels.forEach((label) => (label.style.color = "#EAEAEA"));
      inputs.forEach((input) => (input.style.color = "#EAEAEA"));
      button.style.background = "#3B82F6";
      button.style.color = "#EAEAEA";
      texts[0].style.opacity = "1";
      texts[1].style.opacity = "0";
    }
  }

  toggleSwitch.addEventListener("change", updateTheme);
  updateTheme();
  window.addEventListener("resize", function () {
    if (window.innerWidth < 500) {
      loginBox.style.width = "90%";
      loginBox.style.height = "auto";
    } else {
      loginBox.style.width = "400px";
      loginBox.style.height = "450px";
    }
  });
});

//انتقال به صفحه register
document.addEventListener("DOMContentLoaded", function () {
  const registerLink = document.getElementById("login");

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "Register.html";
  });
});

// تنظیمات اولیه صفحه
const fakeUsers = [
  { username: "AliReza", password: "Ali1234" },
  { username: "SaraM", password: "Sara5678" },
  { username: "Mojtaba", password: "Mojt9876" },
  { username: "NedaH", password: "Neda4567" },
  { username: "AmirK", password: "Amir2468" },
  { username: "LeilaS", password: "Leila1357" },
  { username: "Hassan", password: "Hassan2025" },
  { username: "MinaA", password: "Mina3344" },
  { username: "Pouya", password: "Pouya5566" },
  { username: "Negar", password: "Negar7788" },
  { username: "Farhad", password: "Farhad1122" },
  { username: "Shirin", password: "Shirin3344" },
  { username: "Kian", password: "Kian5566" },
  { username: "Parisa", password: "Parisa7788" },
  { username: "RezaH", password: "Reza9900" },
  { username: "Maryam", password: "Maryam123" },
  { username: "SinaR", password: "Sina456" },
  { username: "NimaB", password: "Nima789" },
  { username: "Elham", password: "Elham101" },
  { username: "Omid", password: "Omid202" },
  { username: "Ramin", password: "Ramin303" },
  { username: "Sahar", password: "Sahar404" },
  { username: "Behnam", password: "Behnam505" },
  { username: "Tina", password: "Tina606" },
  { username: "Kourosh", password: "Kourosh707" },
  { username: "Niloofar", password: "Niloofar808" },
  { username: "Aria", password: "Aria909" },
  { username: "Laleh", password: "Laleh111" },
  { username: "Mehdi", password: "Mehdi222" },
  { username: "Shahab", password: "Shahab333" },
  { username: "Elina", password: "Elina444" },
  { username: "Piroz", password: "Piroz555" },
  { username: "Yasmin", password: "Yasmin666" },
  { username: "Navid", password: "Navid777" },
  { username: "Darya", password: "Darya888" },
  { username: "Pouneh", password: "Pouneh999" },
  { username: "Kamran", password: "Kamran000" },
  { username: "Sogand", password: "Sogand111" },
  { username: "Ashkan", password: "Ashkan222" },
  { username: "Shiva", password: "Shiva333" },
  { username: "Arman", password: "Arman444" },
  { username: "Narges", password: "Narges555" },
  { username: "Sadegh", password: "Sadegh666" },
  { username: "Mahsa", password: "Mahsa777" },
  { username: "Hamed", password: "Hamed888" },
  { username: "Dina", password: "Dina999" },
  { username: "Kamya", password: "Kamya000" },
  { username: "Parya", password: "Parya123" },
  { username: "Roya", password: "Roya456" },
  { username: "Shahram", password: "Shahram789" },
  { username: "Zahra", password: "Zahra101" },
  { username: "NavidB", password: "NavidB202" },
  { username: "ElhamK", password: "ElhamK303" },
];

let button = document.querySelector(".submit");
button.addEventListener("click", (e) => {
  let u = document.querySelector(".user_n");
  let p = document.querySelector(".user_p1");
  let pt = document.querySelector(".user_p2");
  
  let username = u.value.trim();
  let password = p.value.trim();
  let passwordt = pt.value.trim();

  // بررسی طول نام کاربری و رمز
  if (username.length <= 4 || password.length <= 4 || passwordt.length <= 4) {
    alert("کامل نزدی !!");
    u.value = "";
    p.value = "";
    pt.value = "";
    return;
  }

  // بررسی تطابق رمز و تکرار رمز
  if (password !== passwordt) {
    alert("رمز و تکرار رمز شما یکی نیست. لطفا دوبار تلاش کنید");
    p.value = "";
    pt.value = "";
    return;
  }

  // بررسی نام کاربری و رمز با کاربران فیک
  const isDuplicate = fakeUsers.some(
    (user) => user.username === username && user.password === password
  );

  if (isDuplicate) {
    alert("این نام کاربری و رمز قبلا استفاده شده است، لطفا چیز دیگری انتخاب کنید");
    u.value = "";
    p.value = "";
    pt.value = "";
    return;
  }

  // ثبت موفق
  alert("ثبت نام انجام شد");
  console.log("Username:", username);
  console.log("Password:", password);

  e.preventDefault();
  window.location.href = "Login.html";
});



// responsive
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

//انتقال به صفحه login
document.addEventListener("DOMContentLoaded", function () {
  const registerLink = document.getElementById("register");

  registerLink.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "Login.html";
  });
});

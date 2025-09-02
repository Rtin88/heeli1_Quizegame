    const menuToggle = document.getElementById("menuToggle");
      const navMenu = document.getElementById("navMenu");
      const backdrop = document.getElementById("backdrop");
      const headerEl = document.querySelector("header");
      function setMenuPosition() {
        navMenu.style.width = "300px";
        navMenu.style.left = "50%";
        navMenu.style.right = "auto";
        navMenu.style.transformOrigin = "top center";
      }
      function setMenuState(o) {
        navMenu.classList.toggle("open", o);
        menuToggle.classList.toggle("active", o);
        menuToggle.setAttribute("aria-expanded", o);
        navMenu.setAttribute("aria-hidden", !o);
        backdrop.classList.toggle("open", o);
        backdrop.setAttribute("aria-hidden", !o);
        if (o) setMenuPosition();
      }
      function toggleMenu() {
        setMenuState(!navMenu.classList.contains("open"));
      }
      menuToggle.addEventListener("click", toggleMenu);
      menuToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleMenu();
        }
      });
      document.addEventListener("click", (e) => {
        if (!headerEl.contains(e.target)) setMenuState(false);
      });
      backdrop.addEventListener("click", () => setMenuState(false));
      window.addEventListener("resize", () => {
        setMenuState(false);
        setMenuPosition();
      });

      (function () {
        const questions = [
          {
            category: "رایانه و تکنولوژی 💻",
            question: "کدام گزینه زبان برنامه‌نویسی سطح بالا است؟",
            options: ["Assembly", "Python", "Machine Code", "Bytecode"],
            correct: 1,
          },
          {
            category: "ریاضی ➗",
            question: "حاصل ۱۲ × ۸ چند است؟",
            options: ["90", "96", "86", "106"],
            correct: 1,
          },
          {
            category: "علمی 🧪",
            question: "آب در دمای استاندارد چه حالت دارد؟",
            options: ["جامد", "مایع", "گاز", "پلاسما"],
            correct: 1,
          },
        ];

        let qIndex = 0;
        const card = document.querySelector(".quiz-card");
        const timerFill = document.getElementById("timerFill");
        const optionsWrap = document.getElementById("optionsList");
        const bombBtn = document.getElementById("bombBtn");
        const submitBtn = document.getElementById("submitBtn");
        const nextBtn = document.getElementById("nextBtn");
        const removesLeftEl = document.getElementById("removesLeft");
        const statusMsg = document.getElementById("statusMsg");

        const timeLimitSec = Number(card.dataset.timeLimit) || 30;
        const timeLimit = timeLimitSec * 1000;

        let removesLeft = Number(card.dataset.removes) || 2;
        let selected = null;
        let startTs = null;
        let rafId = null;
        let finished = false;
        let lastTickSecond = Infinity;
        let audioCtx = null;

        function ensureAudio() {
          if (!audioCtx) {
            try {
              audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();
            } catch (e) {
              audioCtx = null;
            }
          }
        }
        function beep(f, d, t = "sine", g = 0.05) {
          if (!audioCtx) return;
          const o = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          o.type = t;
          o.frequency.value = f;
          o.connect(gain);
          gain.connect(audioCtx.destination);
          const now = audioCtx.currentTime;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(g, now + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + d);
          o.start(now);
          o.stop(now + d + 0.05);
        }
        function successTone() {
          ensureAudio();
          beep(880, 0.12, "sine", 0.06);
          setTimeout(() => beep(1174.66, 0.12, "sine", 0.06), 120);
          setTimeout(() => beep(1760, 0.14, "sine", 0.06), 240);
        }
        function failTone() {
          ensureAudio();
          beep(220, 0.18, "square", 0.05);
          setTimeout(() => beep(180, 0.18, "square", 0.05), 140);
        }
        function timeUpTone() {
          ensureAudio();
          beep(880, 0.12, "triangle", 0.05);
          setTimeout(() => beep(523.25, 0.18, "triangle", 0.05), 130);
          setTimeout(() => beep(392, 0.22, "triangle", 0.05), 260);
        }
        function tickTone() {
          ensureAudio();
          beep(1200, 0.05, "square", 0.03);
        }

        function getOptionEls() {
          return Array.from(optionsWrap.querySelectorAll(".option"));
        }

        function setTimerProgress(p) {
          if (p < 0) p = 0;
          if (p > 1) p = 1;
          timerFill.style.width = p * 100 + "%";
          const c = getComputedStyle(document.documentElement);
          const c1 = c.getPropertyValue("--time-1").trim();
          const c2 = c.getPropertyValue("--time-2").trim();
          const c3 = c.getPropertyValue("--time-3").trim();
          function h2r(h) {
            h = h.replace("#", "");
            return {
              r: parseInt(h.slice(0, 2), 16),
              g: parseInt(h.slice(2, 4), 16),
              b: parseInt(h.slice(4, 6), 16),
            };
          }
          function r2h(o) {
            return (
              "#" +
              [o.r, o.g, o.b]
                .map((x) => x.toString(16).padStart(2, "0"))
                .join("")
            );
          }
          function mix(a, b, t) {
            return {
              r: Math.round(a.r * (1 - t) + b.r * t),
              g: Math.round(a.g * (1 - t) + b.g * t),
              b: Math.round(a.b * (1 - t) + b.b * t),
            };
          }
          const C1 = h2r(c1),
            C2 = h2r(c2),
            C3 = h2r(c3);
          let col;
          if (p > 0.5) {
            const t = (p - 0.5) / 0.5;
            col = r2h(mix(C2, C1, t));
          } else {
            const t = p / 0.5;
            col = r2h(mix(C3, C2, t));
          }
          timerFill.style.background = `linear-gradient(90deg, ${col}, ${col})`;
        }

        function startTimer() {
          startTs = performance.now();
          finished = false;
          cancelAnimationFrame(rafId);
          lastTickSecond = Infinity;
          tick();
        }
        function tick(now) {
          if (!startTs) startTs = now || performance.now();
          const elapsed = (now || performance.now()) - startTs;
          const remaining = Math.max(0, timeLimit - elapsed);
          const p = remaining / timeLimit;
          setTimerProgress(p);
          const sec = Math.ceil(remaining / 1000);
          if (sec <= 5 && sec !== lastTickSecond) {
            lastTickSecond = sec;
            tickTone();
          }
          if (remaining <= 0) {
            finishTime();
            return;
          }
          rafId = requestAnimationFrame(tick);
        }

        function finishTime() {
          finished = true;
          setTimerProgress(0);
          lockOptions();
          revealCorrect();
          bombBtn.disabled = true;
          submitBtn.disabled = true;
          statusMsg.textContent = "زمان پاسخ‌دهی به پایان رسید";
          timeUpTone();
          showNextButton();
        }

        function lockOptions() {
          getOptionEls().forEach((op) => {
            op.classList.add("locked");
            op.querySelector("input") &&
              op.querySelector("input").setAttribute("disabled", "true");
          });
        }
        function unlockOptions() {
          getOptionEls().forEach((op) => {
            op.classList.remove("locked");
            op.querySelector("input") &&
              op.querySelector("input").removeAttribute("disabled");
          });
        }

        function revealCorrect() {
          getOptionEls().forEach((o) => {
            const isC = o.getAttribute("data-correct") === "true";
            if (isC) {
              o.classList.add("correct");
            } else {
              o.classList.add("wrong");
            }
          });
        }

        function availableWrong() {
          return getOptionEls().filter(
            (o) =>
              !o.classList.contains("eliminated") &&
              o.getAttribute("data-correct") !== "true" &&
              o !== selected
          );
        }

        optionsWrap.addEventListener("click", (e) => {
          const op = e.target.closest(".option");
          if (
            !op ||
            finished ||
            op.classList.contains("eliminated") ||
            op.classList.contains("locked")
          )
            return;
          ensureAudio();
          if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume && audioCtx.resume();
          }
          const rip = document.createElement("span");
          rip.className = "ripple";
          const rect = op.getBoundingClientRect();
          rip.style.left = e.clientX - rect.left - 12 + "px";
          rip.style.top = e.clientY - rect.top - 12 + "px";
          op.appendChild(rip);
          setTimeout(() => rip.remove(), 620);

          getOptionEls().forEach((x) => {
            x.classList.remove("selected");
            const i = x.querySelector("input");
            if (i) i.checked = false;
          });
          const inp = op.querySelector("input");
          if (inp) inp.checked = true;
          op.classList.add("selected");
          selected = op;
          statusMsg.textContent = "";
        });

        function bindRadios() {
          const radios = optionsWrap.querySelectorAll("input[type=radio]");
          radios.forEach((r) =>
            r.addEventListener("change", () => {
              if (finished) return;
              getOptionEls().forEach((x) => x.classList.remove("selected"));
              const op = r.closest(".option");
              op.classList.add("selected");
              selected = op;
              statusMsg.textContent = "";
            })
          );
        }

        bombBtn.addEventListener("click", () => {
          if (finished) return;
          ensureAudio();
          const emoji = bombBtn.querySelector(".bomb-emoji");
          emoji.classList.add("kaboom");
          setTimeout(() => emoji.classList.remove("kaboom"), 420);
          const pool = availableWrong();
          if (removesLeft <= 0 || pool.length === 0) return;
          const pick = pool[Math.floor(Math.random() * pool.length)];
          pick.classList.add("eliminated");
          const inp = pick.querySelector("input");
          if (inp && inp.checked) {
            inp.checked = false;
            pick.classList.remove("selected");
            selected = null;
          }
          if (inp) inp.setAttribute("disabled", "true");
          removesLeft--;
          removesLeftEl.textContent = removesLeft;
          if (removesLeft <= 0) bombBtn.disabled = true;
          pick.animate(
            [
              { transform: "translateY(0) scale(1)", opacity: 1 },
              { transform: "translateY(-6px) scale(.98)", opacity: 0.5 },
              { transform: "translateY(0) scale(1)", opacity: 0.45 },
            ],
            { duration: 420, easing: "ease-out" }
          );
        });

        submitBtn.addEventListener("click", () => {
          if (finished) {
            statusMsg.textContent = "زمان تمام شده";
            return;
          }
          ensureAudio();
          if (!selected) {
            statusMsg.textContent = "ابتدا یک گزینه را انتخاب کنید";
            return;
          }
          const isCorrect = selected.getAttribute("data-correct") === "true";
          getOptionEls().forEach((o) => {
            const inp = o.querySelector("input");
            if (inp) inp.setAttribute("disabled", "true");
            if (o.getAttribute("data-correct") === "true")
              o.classList.add("correct");
            if (o !== selected && o.getAttribute("data-correct") !== "true")
              o.classList.add("wrong");
          });
          if (isCorrect) {
            statusMsg.textContent = "آفرین! پاسخ درست";
            successTone();
          } else {
            statusMsg.textContent = "پاسخ اشتباه";
            failTone();
          }
          finished = true;
          bombBtn.disabled = true;
          submitBtn.disabled = true;
          cancelAnimationFrame(rafId);
          setTimerProgress(0);
          showNextButton();
        });

        nextBtn.addEventListener("click", () => {
          hideNextButton();
          loadQuestion((qIndex + 1) % questions.length);
        });

        function showNextButton() {
          nextBtn.classList.add("show");
          nextBtn.setAttribute("aria-hidden", "false");
        }
        function hideNextButton() {
          nextBtn.classList.remove("show");
          nextBtn.setAttribute("aria-hidden", "true");
        }

        function loadQuestion(index) {
          qIndex = index;
          const q = questions[qIndex];
          document.getElementById("categoryName").textContent = q.category;
          document.getElementById("questionText").textContent = q.question;
          optionsWrap.innerHTML = "";
          const name = "q_" + Date.now();
          q.options.forEach((optText, i) => {
            const lab = document.createElement("label");
            lab.className = "option";
            lab.setAttribute(
              "data-correct",
              i === q.correct ? "true" : "false"
            );
            const input = document.createElement("input");
            input.type = "radio";
            input.name = name;
            input.value = optText;
            input.setAttribute("aria-label", optText);
            const span = document.createElement("span");
            span.className = "labelText";
            span.textContent = optText;
            const tick = document.createElement("div");
            tick.className = "tick";
            tick.setAttribute("aria-hidden", "true");
            lab.appendChild(input);
            lab.appendChild(span);
            lab.appendChild(tick);
            optionsWrap.appendChild(lab);
          });

          removesLeft = Number(card.dataset.removes) || 2;
          removesLeftEl.textContent = removesLeft;
          bombBtn.disabled = false;
          submitBtn.disabled = false;
          selected = null;
          statusMsg.textContent = "";
          finished = false;
          hideNextButton();
          unlockOptions();
          getOptionEls().forEach((o) => {
            o.classList.remove("selected", "eliminated", "correct", "wrong");
          });

          bindRadios();
          startTimer();
        }

        loadQuestion(0);

        document.addEventListener(
          "click",
          () => {
            ensureAudio();
            if (audioCtx && audioCtx.state === "suspended") {
              audioCtx.resume && audioCtx.resume();
            }
          },
          { once: true }
        );
      })();
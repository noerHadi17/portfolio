window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-custom");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Tambahkan efek active scroll
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Inisialisasi animasi dan typed.js jika ada elemen yang dituju
  if (document.getElementById("typed")) {
    new Typed("#typed", {
      strings: ["Business Analyst", "Data Scientist", "Web Scraper","Backend Developer", "Machine Learning Enthusiast",
                "AI Engineer","Data Analyst", "Data Engineer"], 
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
    });
  }

  if (document.getElementById("year")) {
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  // price_predictor ONLY if form exists
  const form = document.getElementById("predictForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = {};
      formData.forEach((val, key) => {
        data[key] = isNaN(val) ? val : Number(val);
      });

      try {
        const response = await fetch("https://web-production-4c1bf.up.railway.app/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        const resultBox = document.getElementById("result");

        if (result.prediction !== undefined) {
          resultBox.style.display = "block";
          resultBox.innerText = `Predicted Price: Rp ${result.prediction.toLocaleString()} Million`;
        } else if (result.error) {
          resultBox.style.display = "block";
          resultBox.innerText = `❌ Error: ${result.error}`;
        } else {
          resultBox.style.display = "block";
          resultBox.innerText = "Prediction failed.";
        }
      } catch (err) {
        const resultBox = document.getElementById("result");
        resultBox.style.display = "block";
        resultBox.innerText = `❌ Server error: ${err.message}`;
      }
    });
  }
  AOS.init(); 
 
});
  

  //////////js untuk price_predictor/////////////
// untuk animasi button
  document.getElementById('predict-btn').addEventListener('click', function() {
    document.getElementById('predicting-animation').style.display = 'block';
    document.getElementById('prediction-result').innerHTML = '';

    // Simulate prediction delay (replace with your actual prediction logic)
    setTimeout(function() {
      document.getElementById('predicting-animation').style.display = 'none';
    }, 2000); // 2 seconds for demo
  });



   // ========== Load README.md using Showdown.js ==========
document.addEventListener("DOMContentLoaded", function () {
  const readmeContainer = document.getElementById("readme-content");

  if (readmeContainer) {
    fetch("README.md") // pastikan file README (1).MD diubah jadi README.md
      .then((res) => res.text())
      .then((markdown) => {
        const converter = new showdown.Converter({ tables: true, strikethrough: true });
        const html = converter.makeHtml(markdown);
        readmeContainer.innerHTML = html;
      })
      .catch((err) => {
        readmeContainer.innerHTML = `<p style="color:red;">❌ Gagal memuat README: ${err.message}</p>`;
      });
  }
});



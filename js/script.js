document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    //  Header sticky
    const headerSticky = function() {
      const header = document.querySelector('#header');
      const logo = document.querySelector('.navbar-brand img');
      if (!header || !logo) return;
    
      const trigHeight = 1;

      window.addEventListener('scroll', function () {
          let tj = window.scrollY;

          if (tj > trigHeight) {
              header.classList.add('sticky');
              logo.classList.add('logo-black');
          } else {
              header.classList.remove('sticky');
              logo.classList.remove('logo-black');
          }
      });
    };
    
    const setActiveLink = function () {
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-link");

      window.addEventListener("scroll", function () {
          let scrollPosition = window.scrollY + 100; // Adjust offset for sticky header height

          sections.forEach((section) => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;

              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                  const sectionId = section.getAttribute("id");

                  navLinks.forEach((link) => {
                      link.classList.remove("active");
                      if (link.getAttribute("href") === `#${sectionId}`) {
                          link.classList.add("active");
                      }
                  });
              }
          });
      });
    };

    const closeNavbarOnClick = function () {
        const navLinks = document.querySelectorAll(".nav-link");
        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navLinks.length > 0 && navbarCollapse) {
            navLinks.forEach(link => {
                link.addEventListener("click", function () {
                    if (navbarCollapse.classList.contains("show")) {
                        const collapse = new bootstrap.Collapse(navbarCollapse, {
                            toggle: true,
                        });
                        collapse.hide(); // Collapse the menu
                    }
                });
            });
        }
    };

    // Initialize all functions
    headerSticky();
    setActiveLink();
    closeNavbarOnClick();
});



function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/documents/WEBSITE_BARBARA_SOFIA_ILARDO_CV_2024_ENG.pdf';
  link.download = 'Barbara_Sofia_Ilardo_ADHDologia_resume.pdf';
  document.body.appendChild(link); // Append link to the body
  link.click(); // Trigger download
  document.body.removeChild(link); // Clean up after the download
}


(function($) {

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

    $(document).ready(function() {
      
 
      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        slidesPerView: 'auto',
        spaceBetween: 30, // Space between slides
        centeredSlides: true, // Keep slides centered

        pagination: {
          el: ".testimonial-swiper-pagination",
          clickable: true, // Allow pagination interaction
        },
/*         breakpoints: {
          
          0: {
            slidesPerView: 1, // Display 1 card on small screens
          },
          800: {
            slidesPerView: 2, // Display 2 card on small screens
          },
          1800: {
            slidesPerView: 3, // Display 2 cards on large screens
          },

        }, */
      });
    
      // Force Swiper to update on window resize
      $(window).on('resize', function() {
        testimonialSwiper.update();
      });
      
      var gallerySwiper = new Swiper(".gallery-swiper", {
        spaceBetween: 20,
        pagination: {
            el: ".gallery-swiper-pagination",
            clickable: true,
          },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 2,
          },
          1400: {
            slidesPerView: 4,
          }
        },
      });



      headerSticky();
      setActiveLink();

    }); // End of a document ready

})(jQuery);


/* var swiper = new Swiper('.testimonial-swiper', {
  slidesPerView: 'auto',
  spaceBetween: 30, // Space between cards
  centeredSlides: true, // Center the active slide
  loop: true, // Optional: Make it loop infinitely
  pagination: {
    el: '.testimonial-swiper-pagination',
    clickable: true,
  },
}); */

/* 
document.addEventListener("DOMContentLoaded", function () {
  function addMobileClass() {
      const sections = document.querySelectorAll("section .container");
      if (window.innerWidth <= 768) { // Check for mobile screen width
          sections.forEach(section => {
              section.classList.add("mx-3");
          });
      } else {
          sections.forEach(section => {
              section.classList.remove("mx-3"); // Remove class if not mobile
          });
      }
  }

  // Run on page load
  addMobileClass();

  // Run on window resize
  window.addEventListener("resize", addMobileClass);
});
 */


function downloadCV() {
  const link = document.createElement('a');
  link.href = 'assets/documents/WEBSITE_BARBARA_SOFIA_ILARDO_CV_2024_ENG.pdf';
  link.download = 'Barbara_Sofia_Ilardo_ADHDologia_resume.pdf';
  document.body.appendChild(link); // Append link to the body
  link.click(); // Trigger download
  document.body.removeChild(link); // Clean up after the download
}


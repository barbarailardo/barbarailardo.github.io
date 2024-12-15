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
      
      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });
  
        $('#myModal').on('shown.bs.modal', function (e) {
  
        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })
  
      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })

      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        spaceBetween: 20,
        pagination: {
            el: ".testimonial-swiper-pagination",
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



const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-message', (req, res) => {
  const { 'full-name': fullName, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'adhdologia@gmail.com',
      pass: 'your-email-password'
    }
  });

  const mailOptions = {
    from: email,
    to: 'adhdologia@gmail.com',
    subject: `New message from ${fullName}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email.');
    }
    res.send('Message sent successfully!');
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));

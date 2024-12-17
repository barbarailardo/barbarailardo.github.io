document.addEventListener('DOMContentLoaded', function () {
    const aboutSection = document.querySelector('#about .container ');

    // Event listener for mouseenter to start confetti
    aboutSection.addEventListener('mouseenter', function () {
        startConfetti();
    });

    // Event listener for mouseleave to stop confetti
    aboutSection.addEventListener('mouseleave', function () {
        stopConfetti();
    });
});

// Confetti logic remains the same
var maxParticleCount = 40; // set max confetti count
var particleSpeed = 0; // set the particle animation speed
var startConfetti; // call to start confetti animation
var stopConfetti; // call to stop adding confetti
var toggleConfetti; // call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; // call to stop the confetti animation and remove all confetti immediately

(function() {
    startConfetti = startConfettiInner;
    stopConfetti = stopConfettiInner;
    toggleConfetti = toggleConfettiInner;
    removeConfetti = removeConfettiInner;

    var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"];
    var streamingConfetti = false;
    var animationTimer = null;
    var particles = [];
    var waveAngle = 0;

    // Polyfill for requestAnimationFrame
    window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60); // 60 FPS
    };

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;

        // Adjust the particle's vertical starting position
        // Get the top position of the #about section and set the y position of the particles
        var sectionTop = document.querySelector('#about').getBoundingClientRect().top;
        particle.y = sectionTop + Math.random() * height - height / 2;  // Adjust this offset for fine-tuning

        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
    }

    function startConfettiInner() {
        var width = window.innerWidth;
        var aboutSection = document.querySelector('#about');
        var canvas = document.getElementById("confetti-canvas");

        // If the canvas does not exist, create and append it inside the About section
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position: absolute;top: 0; left: 0;");
            document.querySelector('#about').appendChild(canvas); // Append canvas inside the About section

            // Set canvas size to match the #about section dimensions
            var rect = aboutSection.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height *1.77;

            window.addEventListener("resize", function () {
                var rect = aboutSection.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;
            }, true);
        }

        var context = canvas.getContext("2d");
        while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, canvas.width, canvas.height));

        streamingConfetti = true;
        if (animationTimer === null) {
            (function runAnimation() {
                context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before redrawing
                if (particles.length === 0)
                    animationTimer = null;
                else {
                    updateParticles(canvas);
                    drawParticles(context);
                    animationTimer = requestAnimFrame(runAnimation);
                }
            })();
        }
    }

    function stopConfettiInner() {
        streamingConfetti = false;
    }

    function removeConfettiInner() {
        stopConfetti();
        particles = [];
    }

    function toggleConfettiInner() {
        if (streamingConfetti)
            stopConfettiInner();
        else
            startConfettiInner();
    }

    function drawParticles(context) {
        var particle;
        var x;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
            context.stroke();
        }
    }

    function updateParticles(canvas) {
        var width = canvas.width;
        var height = canvas.height;
        var particle;
        waveAngle += 0.01;

        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (!streamingConfetti && particle.y < -15)
                particle.y = height + 100;
            else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle);
                particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }

            // Remove particles that go out of bounds
            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if (streamingConfetti && particles.length <= maxParticleCount)
                    resetParticle(particle, width, height);
                else {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
})();

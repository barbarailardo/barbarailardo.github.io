// Placeholder for future interactivity
console.log("Welcome to ADHDologia!");


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");

    // Function to adjust section heights
    const setSectionHeights = () => {
        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            section.style.height = `${viewportHeight}px`;
        });
    };

    // Set initial section heights
    setSectionHeights();

    // Adjust section heights on window resize
    window.addEventListener("resize", setSectionHeights);
});


document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section .about-content");

    const handleScroll = () => {
        const viewportHeight = window.innerHeight - 200;

        sections.forEach(content => {
            const rect = content.getBoundingClientRect();

            // Calculate how much of the element is visible
            const visibleHeight = Math.max(0, Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0));
            const visibilityRatio = visibleHeight / rect.height; // Percentage of the element visible

            // Calculate blur based on visibility ratio
            let blurAmount = 20; // Fully blurred
            if (visibilityRatio >= 0.3) {
                blurAmount = 0; // Fully unblurred
            } else if (visibilityRatio > 0) {
                // Linearly interpolate blur between 0 and 10px based on visibility ratio
                blurAmount = 10 * (1 - visibilityRatio / 0.7);
            }

            // Apply the blur effect
            content.style.filter = `blur(${Math.max(0, blurAmount)}px)`;
        });
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set the blur on page load
    handleScroll();
});


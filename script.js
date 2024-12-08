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

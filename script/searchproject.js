const projects = [
    { title: "IoT Smart Home", theme: "iot", description: "An IoT project to control home appliances remotely." },
    { title: "AI-Powered Chatbot", theme: "machine-learning", description: "A chatbot that uses machine learning to respond intelligently." },
    { title: "E-Commerce Website", theme: "web-development", description: "A fully responsive e-commerce website built with HTML, CSS, and JavaScript." },
    { title: "Solar Tracking System", theme: "electronics", description: "An electronics project to track solar panel movement." }
];

function searchProjects() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const themeSelect = document.getElementById("theme-select").value;
    const resultsContainer = document.getElementById("search-results");

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Filter projects based on search and theme selection
    const filteredProjects = projects.filter(project => {
        const matchesTheme = themeSelect === "" || project.theme === themeSelect;
        const matchesSearch = searchInput === "" || project.title.toLowerCase().includes(searchInput);
        return matchesTheme && matchesSearch;
    });

    // Display filtered projects
    if (filteredProjects.length > 0) {
        filteredProjects.forEach(project => {
            const projectItem = document.createElement("div");
            projectItem.classList.add("project-item");
            projectItem.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            resultsContainer.appendChild(projectItem);
        });
    } else {
        resultsContainer.innerHTML = "<p>No projects found.</p>";
    }
}

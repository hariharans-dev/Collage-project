const getCollegesURL =
  "https://ftvazegzmd.execute-api.ap-south-1.amazonaws.com/stage1/getcollage";

const getCategoriesURL =
  "https://ftvazegzmd.execute-api.ap-south-1.amazonaws.com/stage1/getcategory";

function searchProjects() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  const themeSelect = document.getElementById("theme-select").value;
  const resultsContainer = document.getElementById("search-results");

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Filter projects based on search and theme selection
  const filteredProjects = projects.filter((project) => {
    const matchesTheme = themeSelect === "" || project.theme === themeSelect;
    const matchesSearch =
      searchInput === "" || project.title.toLowerCase().includes(searchInput);
    return matchesTheme && matchesSearch;
  });

  // Display filtered projects
  if (filteredProjects.length > 0) {
    filteredProjects.forEach((project) => {
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

let categories = [];

function fetchCategories() {
  fetch(getCategoriesURL, { mode: "cors" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      // console.log(data); // Debugging step to verify data
      categories = data;
      populateDropdown(categories);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
}
function populateDropdown(categories) {
  const categorySelect = document.getElementById("project-category");
  categorySelect.innerHTML = '<option value="">Select a category...</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category._id;
    option.textContent = category.title;
    categorySelect.appendChild(option);
  });
}

function filterCategories() {
  const searchInput = document
    .getElementById("category-search")
    .value.toLowerCase();

  // Safely filter categories
  const filteredCategories = categories.filter(
    (category) =>
      category.title && category.title.toLowerCase().includes(searchInput)
  );

  populateDropdown(filteredCategories);
}

document.addEventListener("DOMContentLoaded", fetchCategories);

let colleges = [];

function fetchColleges() {
  fetch(getCollegesURL, { mode: "cors" }) // Replace with your actual API URL
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      colleges = data;
      populateCollegeDropdown(colleges);
    })
    .catch((error) => {
      console.error("Error fetching colleges:", error);
    });
}

function populateCollegeDropdown(colleges) {
  const collegeSelect = document.getElementById("search-college");
  collegeSelect.innerHTML = '<option value="">Select a college...</option>';

  colleges.forEach((college) => {
    const option = document.createElement("option");
    option.value = college._id;
    option.textContent = college.collage; // Use the 'collage' property
    collegeSelect.appendChild(option);
  });
}

function filterColleges() {
  const searchInput = document
    .getElementById("college-search")
    .value.toLowerCase();
  const filteredColleges = colleges.filter(
    (college) => college.collage.toLowerCase().includes(searchInput) // Use the 'collage' property
  );
  populateCollegeDropdown(filteredColleges);
}

document.addEventListener("DOMContentLoaded", fetchColleges);

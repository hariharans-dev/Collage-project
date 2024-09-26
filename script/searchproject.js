const categoryurl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/category";

const collageurl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/collage";

const projecturl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/project";

let categories = [];

let colleges = [];

let projects = [];

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

function fetchCategories() {
  fetch(categoryurl, { mode: "cors" })
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

function fetchColleges() {
  fetch(collageurl, { mode: "cors" }) // Replace with your actual API URL
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

document
  .querySelector(".search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting the usual way

    // Create an object to hold the form data
    const formData = {
      college: document.getElementById("search-college").value,
      category: document.getElementById("project-category").value,
    };

    // Check if the required fields are filled
    if (!formData.college || !formData.category) {
      alert("Please select both a college and a category.");
      return; // Stop form submission if fields are empty
    }

    // Log the form data object to the console (for debugging purposes)
    console.log(JSON.stringify(formData, null, 2));

    // Build the query string from the formData, ensuring to match the required structure
    const queryString = new URLSearchParams({
      collage: formData.college,
      category: formData.category,
    }).toString(); // This will create a string like "collage=1&category=3"

    // Send GET request to the API
    fetch(`${projecturl}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        if (data.length > 0) {
          projects = data; // Store the data in the array
          displayResults(); // Call the function to display the results
        } else {
          console.log("No projects found.");
          projects = []; // Clear the array if no projects are found
          displayResults(); // Call the function to display the results (will show "No results found.")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function displayResults() {
  const resultsContainer = document.getElementById("results");

  // Clear previous results
  resultsContainer.innerHTML = "";

  // Check if there are any projects to display
  if (projects.length > 0) {
    // Create a table to display the projects
    const table = document.createElement("table");
    table.classList.add("project-table");

    // Create table header
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>College</th>
          <th>Contacts</th>
        `;
    table.appendChild(headerRow);

    // Append project details to the table
    projects.forEach((project) => {
      const row = document.createElement("tr");

      const categoryName =
        categories.find((cat) => cat._id === Number(project.category))?.title ||
        "Unknown"; // Get category title

      const collegeName =
        colleges.find((col) => col._id === Number(project.collage))?.collage ||
        "Unknown"; // Get college name

      row.innerHTML = `
            <td>${project.title}</td>
            <td>${project.description}</td>
            <td>${categoryName}</td>
            <td>${collegeName}</td>
            <td>${project.contacts
              .map((contact) => `${contact.method}: ${contact.value}`)
              .join("<br>")}</td>
          `;
      table.appendChild(row);
    });

    // Append table to results container and show it
    resultsContainer.appendChild(table);
    resultsContainer.style.display = "block";
  } else {
    // If no projects, display a message
    resultsContainer.innerHTML = "<p>No results found.</p>";
    resultsContainer.style.display = "none";
  }
}

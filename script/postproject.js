const categoryurl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/category";

const collageurl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/collage";

const projecturl =
  "https://vs7livci6i.execute-api.ap-south-1.amazonaws.com/stage/project";

let categories = [];

let colleges = [];

function fetchCategories() {
  fetch(categoryurl, { mode: "cors" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
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
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchInput)
  );
  populateDropdown(filteredCategories);
}

function refreshCategories() {
  fetch(categoryurl, { mode: "cors" })
    .then((response) => response.json())
    .then((data) => {
      const categorySelect = document.getElementById("project-category");
      categorySelect.innerHTML =
        '<option value="">Select a category...</option>';

      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category._id;
        option.textContent = category.title;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error refreshing categories:", error);
    });
}

document.addEventListener("DOMContentLoaded", fetchCategories);

function addCategory() {
  const newCategory = document
    .getElementById("category-create")
    .value.trim()
    .toLowerCase();

  if (newCategory) {
    fetch(categoryurl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newCategory }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const categorySelect = document.getElementById("project-category");
        const option = document.createElement("option");
        option.value = data._id;
        option.textContent = newCategory;
        categorySelect.appendChild(option);
        categorySelect.value = option.value;

        document.getElementById(
          "new-category-message"
        ).textContent = `New category added successfully!`;
        document.getElementById("category-create").value = "";

        fetchCategories();
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        document.getElementById("new-category-message").textContent =
          "Error adding category. Please try again.";
      });
  } else {
    document.getElementById("new-category-message").textContent =
      "Category is empty";
  }
}

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
  const collegeSelect = document.getElementById("project-collage");
  collegeSelect.innerHTML = '<option value="">Select a college...</option>';

  colleges.forEach((college) => {
    const option = document.createElement("option");
    option.value = college._id;
    option.textContent = college.collage; // Assuming college has a `name` property
    collegeSelect.appendChild(option);
  });
}

function filterCollage() {
  const searchInput = document
    .getElementById("collage-search")
    .value.toLowerCase();
  const filteredColleges = colleges.filter(
    (college) => college.collage.toLowerCase().includes(searchInput) // Assuming college has a `name` property
  );
  populateCollegeDropdown(filteredColleges);
}

document.addEventListener("DOMContentLoaded", fetchColleges);

function refreshCollage() {
  fetch(collageurl, { mode: "cors" }) // Replace with your actual API URL
    .then((response) => response.json())
    .then((data) => {
      const collegeSelect = document.getElementById("project-collage");
      collegeSelect.innerHTML = '<option value="">Select a college...</option>';

      data.forEach((college) => {
        const option = document.createElement("option");
        option.value = college._id;
        option.textContent = college.collage; // Assuming college has a `name` property
        collegeSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error refreshing colleges:", error);
    });
}

function addCollage() {
  const newCollage = document.getElementById("collage-create").value.trim();

  if (newCollage) {
    fetch(collageurl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ collage: newCollage }), // Correct format for the API request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const collegeSelect = document.getElementById("project-collage");
        const option = document.createElement("option");
        option.value = data._id;
        option.textContent = newCollage;
        collegeSelect.appendChild(option);
        collegeSelect.value = option.value;

        document.getElementById(
          "new-collage-message"
        ).textContent = `New college added successfully!`;
        document.getElementById("collage-create").value = "";

        fetchColleges(); // Refresh the list of colleges
      })
      .catch((error) => {
        console.error("Error adding college:", error);
        document.getElementById("new-collage-message").textContent =
          "Error adding college. Please try again.";
      });
  } else {
    document.getElementById("new-collage-message").textContent =
      "College name is empty";
  }
}

document.getElementById("add-contact").addEventListener("click", function () {
  const contactDetailsDiv = document.getElementById("contact-details");

  // Create a new contact item
  const newContactItem = document.createElement("div");
  newContactItem.classList.add("contact-item");

  // Create input fields for contact method and value
  const methodInput = document.createElement("input");
  methodInput.type = "text";
  methodInput.classList.add("contact-input");
  methodInput.placeholder =
    "Enter contact method (e.g., LinkedIn, Phone, Instagram)";
  methodInput.required = true;

  const valueInput = document.createElement("input");
  valueInput.type = "text";
  valueInput.classList.add("contact-value");
  valueInput.placeholder = "Enter contact info (e.g., URL, number)";
  valueInput.required = true;

  // Create a remove button
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.classList.add("remove-contact");
  removeButton.textContent = "Remove";

  // Add event listener to remove contact item
  removeButton.addEventListener("click", function () {
    contactDetailsDiv.removeChild(newContactItem);
  });

  // Append inputs and button to the new contact item
  newContactItem.appendChild(methodInput);
  newContactItem.appendChild(valueInput);
  newContactItem.appendChild(removeButton);

  // Append the new contact item to the contact details div
  contactDetailsDiv.appendChild(newContactItem);
});

document.getElementById("add-contact").addEventListener("click", () => {
  const contactItems = document.querySelectorAll(".contact-item");
  const contacts = [];

  contactItems.forEach((item) => {
    const method = item.querySelector(".contact-input").value.trim();
    const info = item.querySelector(".contact-value").value.trim();

    if (method && info) {
      contacts.push({
        method: method,
        info: info,
      });
    }
  });

  console.log(JSON.stringify(contacts, null, 2)); // Log as JSON string
});

function toggleBudgetField() {
  const assistanceSelect = document.getElementById("project-assistance");
  const budgetField = document.getElementById("budget-field");

  if (assistanceSelect.value === "pay") {
    budgetField.style.display = "block"; // Show budget field
  } else {
    budgetField.style.display = "none"; // Hide budget field
  }
}

document
  .querySelector(".project-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Create an object to hold the form data
    const formData = {
      title: document.getElementById("project-title").value,
      category: document.getElementById("project-category").value,
      collage: document.getElementById("project-collage").value,
      contacts: [],
      description: document.getElementById("project-description").value,
      assistance: document.getElementById("project-assistance").value,
      budget: document.getElementById("budget-amount").value || null,
      // timestamp: new Date().toISOString(), // Add timestamp in ISO format
    };

    // Gather contact details
    const contactItems = document.querySelectorAll(".contact-item");
    contactItems.forEach((item) => {
      const method = item.querySelector(".contact-input").value;
      const value = item.querySelector(".contact-value").value;
      formData.contacts.push({ method, value });
    });

    // Log the form data object to the console
    console.log(JSON.stringify(formData, null, 2));

    // Send POST request to the API
    fetch(projecturl, {
      // Replace with your API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // Show success message
        alert("Your project has been submitted successfully!");
        // Redirect to home page
        window.location.href = "../index.html"; // Adjust the path as needed
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("There was an error submitting your project. Please try again.");
      });
  });

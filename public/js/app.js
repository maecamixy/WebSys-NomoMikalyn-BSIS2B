const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");
const msg = document.getElementById("msg");
const refreshBtn = document.getElementById("refreshBtn");

function showMessage(text, type = "success") {
    msg.replaceChildren();

    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = text;
    msg.appendChild(alert);
}

async function loadUsers() {
    userList.replaceChildren();

    const loading = document.createElement("p");
    loading.className = "text-secondary mb-0";
    loading.textContent = "Loading users...";
    userList.appendChild(loading);

    try {
        const response = await fetch("/api/users");
        const users = await response.json();

        if (!response.ok) {
            throw new Error(users.error || "Could not load users.");
        }

        userList.replaceChildren();

        if (users.length === 0) {
            const empty = document.createElement("p");
            empty.className = "text-secondary mb-0";
            empty.textContent = "No users yet. Add your first test user using the form.";
            userList.appendChild(empty);
            return;
        }

        users.forEach((user) => {
            const item = document.createElement("div");
            item.className = "list-group-item d-flex justify-content-between align-items-center gap-3";

            const details = document.createElement("div");
            details.className = "user-details";

            const name = document.createElement("div");
            name.className = "fw-semibold";
            name.textContent = user.name;

            const email = document.createElement("div");
            email.className = "text-secondary small";
            email.textContent = user.email + (user.age ? ` · Age ${user.age}` : "");

            details.append(name, email);

            const deleteButton = document.createElement("button");
            deleteButton.className = "btn btn-sm btn-outline-danger";
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";
            deleteButton.setAttribute("aria-label", `Delete ${user.name}`);

            deleteButton.addEventListener("click", async () => {
                if (!confirm(`Delete ${user.name}?`)) return;

                try {
                    const response = await fetch(`/api/users/${user._id}`, {
                        method: "DELETE"
                    });
                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(result.error || "Could not delete user.");
                    }

                    showMessage("User deleted.", "warning");
                    await loadUsers();
                } catch (error) {
                    showMessage(error.message, "danger");
                }
            });

            item.append(details, deleteButton);
            userList.appendChild(item);
        });
    } catch (error) {
        userList.replaceChildren();
        const errorText = document.createElement("p");
        errorText.className = "text-danger mb-0";
        errorText.textContent = error.message + " Make sure the server is running and MongoDB is connected.";
        userList.appendChild(errorText);
    }
}

userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(userForm);
    const payload = Object.fromEntries(formData.entries());

    if (payload.age === "") {
        delete payload.age;
    } else {
        payload.age = Number(payload.age);
    }

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Failed to save user.");
        }

        userForm.reset();
        showMessage("User saved successfully.");
        await loadUsers();
    } catch (error) {
        showMessage(error.message, "danger");
    }
});

refreshBtn.addEventListener("click", loadUsers);

loadUsers();

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var token = document.getElementById("password").value;

    fetch("https://api.github.com/user/repos", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    .then(function(response) {
        if (response.ok) {
            console.log(response)
            return response.json();
        } else {
            throw new Error("Fehler beim Abrufen der Repositories. Status: " + response.status);
        }
    })
    .then(function(data) {
        const reposList = document.getElementById("repos-list");
        reposList.innerHTML = "";

        data.forEach(function(repo) {
            var listItem = document.createElement("li");
            listItem.textContent = repo.name;
            reposList.appendChild(listItem);
        });
    })
    .catch(function(error) {
        var messageElement = document.getElementById("message");
        messageElement.textContent = error.message;
    });
});

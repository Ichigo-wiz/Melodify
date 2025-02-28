// Query class to store and log user queries
class Query {
    constructor(username, name, email, query) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.query = query;
    }

    logQuery() {
        console.log("New Query Submitted:");
        console.log("Username:", this.username);
        console.log("Name:", this.name);
        console.log("Email:", this.email);
        console.log("Query:", this.query);
    }
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let queryText = document.getElementById("query").value;

    let userQuery = new Query(username, name, email, queryText);
    
    userQuery.logQuery();
    alert("Your query has been submitted successfully!");
    
    document.getElementById("contactForm").reset();
});

document.getElementById("confirmLogout").addEventListener("click", function () {
    window.location.href = "login.html";
});


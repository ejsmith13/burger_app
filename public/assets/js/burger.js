document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const devourBtns = document.querySelectorAll(".devoured-btn");

  // Set the event listener for the devour button
  if (devourBtns) {
    devourBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute("data-id");
        const eaten = e.target.getAttribute("data-eaten");
        console.log(id);
        console.log(eaten);

        const changeEaten = {
          devoured: eaten,
        };

        console.log(changeEaten);

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(changeEaten),
        }).then((response) => {
          if (response.ok) {
            console.log(`changed devourered to: ${changeEaten}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }

  // CREATE new burger
  const newBurgerBtn = document.getElementById("create-form");

  if (newBurgerBtn) {
    newBurgerBtn.addEventListener("submit", (e) => {
      e.preventDefault();

      // Grabs the value of the textarea
      const newBurger = {
        burger_name: document.getElementById("burger").value.trim(),
      };

      console.log(newBurger);

      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById("burger").value = "";

        // Reload the page
        console.log("Created a new burger!");
        location.reload();
      });
    });
  }
});

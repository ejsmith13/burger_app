document.addEventListener("DOMContentLoaded", (event) => {
    if (event) {
      console.info("DOM loaded");
    }
  
    // UPDATE
    const devourBtns = document.querySelectorAll(".devoured-btn");
  
    // Set up the event listener for the create button
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

          console.log(changeEaten)
  
          fetch(`/api/burgers/${id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
  
            // make sure to serialize the JSON body
            body: JSON.stringify(changeEaten),
          }).then((response) => {
            // Check that the response is all good
            // Reload the page so the user can see the new quote
            if (response.ok) {
              console.log(`changed devourered to: ${eaten}`);
              location.reload("/");
            } else {
              alert("something went wrong!");
            }
          });
        });
      });
    }
  
    // CREATE
    const newBurgerBtn = document.getElementById("create-form");
  
    if (newBurgerBtn) {
      newBurgerBtn.addEventListener("submit", (e) => {
        e.preventDefault();
  
        // Grabs the value of the textarea that goes by the name, "quote"
        const newBurger = {
          burger_name: document.getElementById("burger").value.trim(),
          
        };

        console.log(newBurger)
  
        // Send POST request to create a new quote
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
  
          // Reload the page so the user can see the new quote
          console.log("Created a new burger!");
          location.reload();
        });
      });
    }
  
   
  });
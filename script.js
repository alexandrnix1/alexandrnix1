const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".content-block");

buttons.forEach(button => {

    button.addEventListener("click", () => {

        buttons.forEach(btn => {
            btn.classList.remove("active");
        });

        pages.forEach(page => {
            page.classList.remove("active");
        });

        button.classList.add("active");

        const target =
            button.getAttribute("data-target");

        document
            .getElementById(target)
            .classList.add("active");

    });

});

const fetchButton =
    document.getElementById("fetchButton");

const statusDiv =
    document.getElementById("status");

const resultDiv =
    document.getElementById("result");

async function fetchData(){

    fetchButton.disabled = true;

    fetchButton.textContent = "Loading...";

    statusDiv.innerHTML =
        "Request in progress...";

    resultDiv.innerHTML = "";

    try{

        const response = await fetch(
            "https://nekos.best/api/v2/neko"
        );

        if(!response.ok){
            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }

        const data = await response.json();

        const imageUrl =
            data.results[0].url;

        statusDiv.innerHTML =
            "Neko girl loaded successfully 💜";

        resultDiv.innerHTML = `
            <img
                src="${imageUrl}"
                alt="Neko"
            >
        `;

    }
    catch(error){

        statusDiv.innerHTML =
            "Error loading image ❌";

        console.error(error);

    }
    finally{

        fetchButton.disabled = false;

        fetchButton.textContent = "Request";

    }

}

fetchButton.addEventListener(
    "click",
    fetchData
);
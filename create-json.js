document.querySelector(".create-json").addEventListener("click",(ev) => {
    ev.preventDefault();

    const inputs = document.querySelectorAll("input");

    const arr = [];
    for (let i = 0; i < inputs.length; ++i) {
        arr.push([inputs[i].value, inputs[++i].value]);
    }

    console.log(arr);

    const data = Object.fromEntries(arr);

    console.log(data);

    const file = new Blob([JSON.stringify(data)], {
        type: "application/json"
    });

    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(file));
    link.setAttribute("download", "data.json");
    link.textContent = "DOWNLOAD DATA";
    document.querySelector(".main").append(link);
    URL.revokeObjectURL(file);
},
{ once: true }
);

document.querySelector(".get-data").addEventListener("click", () => {
    (async () => {
        const response = await fetch("https://harryheman.github.io/Work-With-Files-in-JavaScript/Create-JSON/data.json");

        const data = await response.json();

        console.table(data);
    })();
});
  
var vaultData = ''

function addListener() {
    document.getElementById("sav_file").addEventListener("change", handleFileSelect, false);
}

function handleFileSelect(evt) {
    try {
        evt.stopPropagation();
        evt.preventDefault();
        var file = evt.target.files[0];
        var fileName = file.name;
        if (file.size > 3e7) {
            throw "File exceeds maximum size of 30MB"
        }
        if (file) {
            var reader = new FileReader;
            if (evt.target.id == "sav_file") {
                reader.onload = async function () {
                    try {
                        vaultData = new VaultData(fileName, reader.result)
                        await vaultData.loadWithJSON(reader.result)
                        initializeButtons()
                    } catch (error) {
                        alert("Error: " + error)
                    }
                };
                reader.readAsText(file)
            }
        } else {
            console.log("huh???")
        }
    } catch (error) {
        alert("Error: " + error)
    } finally {
        //evt.target.value = null
    }
}

function initializeButtons() {
    var main_data = document.getElementById("main_data")
    main_data.innerHTML = '<button onclick="displayAddLegendary()">Add Selected Legendaries</button>'
    var legendaryDwellers = vaultData.getLegendaryDwellers()
    var dwellerList = document.createElement("ul")

    legendaryDwellers.dwellers.forEach((dweller) => {
        var currDweller = document.createElement("li")
        currDweller.innerHTML = dweller.Label
        if (dweller.DwellerId != "UNKNOWN") {
            var checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.id = dweller.Name
            checkbox.classList.add("dwellerCheck")
            currDweller.appendChild(checkbox)
        } else {
            currDweller.innerHTML = `${dweller.Label} is currently unimplemented, check back later!`
        }
        dwellerList.appendChild(currDweller)
    })
    main_data.appendChild(dwellerList)
}

function displayAddLegendary() {
    //var updatedData = addLegendary(vaultData)

    addManyLegendary(vaultData)
    alert("Added legendaries!")
}
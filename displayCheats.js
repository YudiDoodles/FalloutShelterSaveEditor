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
    main_data.innerHTML = '<button onclick="displayAddLegendary()">Add Legendary (Old Longfellow)</button>'
}

function displayAddLegendary(){
    var updatedData = addLegendary(vaultData)
    alert("Added legendary!")
}
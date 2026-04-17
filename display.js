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
    main_data.innerHTML = '<button onclick="clearAll()">Clear All</button><button onclick="showDwellers()">Dwellers</button><button onclick="clearDwellers()">Clear Dwellers</button><button onclick="showVault()">Vault Map</button><button onclick="clearVault()">Clear Map</button><button onclick="showWSGData("outfits")">Outfits</button><button onclick="showWSGData("weapons")">Weapons</button><div id="main_reader"><table id="dwellers"></table><table id="vault_map"></table></div>'
}

function clearDwellers() {
    var dweller_table = document.getElementById("dwellers")
    dweller_table.innerHTML = ''
}

function clearVault() {
    var vault_table = document.getElementById("vault_map")
    vault_table.innerHTML = ''
}

function clearAll() {
    var main_section = document.getElementById("main_reader")
    var dweller_table = document.getElementById("dwellers")
    dweller_table.innerHTML = ''
    var vault_table = document.getElementById("vault_map")
    vault_table.innerHTML = ''
    main_section.innerHTML = ''
    main_section.appendChild(dweller_table)
    main_section.appendChild(vault_table)
}

function showDwellers() {
    try {
        const dwellerMap = reverseParents(vaultData)
        var dweller_table = document.getElementById("dwellers")
        dweller_table.innerHTML = '<tr><th>Dweller</th><th>Gender</th><th>Rarity</th><th>Unique Data?</th><th>Gen Depth</th></tr>'

        dwellerMap.forEach((dweller) => {
            var new_row = document.createElement("tr")

            var basic = document.createElement("td")
            basic.innerHTML = `${dweller.id}. ${dweller.fullName}`

            var gender = document.createElement("td")
            gender.innerHTML = dweller.fullDweller.gender == 1 ? 'Female' : 'Male'

            var rarity = document.createElement("td")
            rarity.innerHTML = dweller.fullDweller.rarity

            var unique = document.createElement("td")
            unique.innerHTML = dweller.fullDweller.uniqueData
            
            var depth = document.createElement("td")
            depth.innerHTML = dweller.generationDepth

            var children = document.createElement("td")
            children.innerHTML = dweller.descendants

            new_row.appendChild(basic)
            new_row.appendChild(gender)
            new_row.appendChild(rarity)
            new_row.appendChild(unique)
            new_row.appendChild(depth)
            new_row.appendChild(children)
            dweller_table.appendChild(new_row)
        })
    } catch (error) {
        alert("Error: " + error)
    }
}

function showVault() {
    try {
        var vault_map = vaultData.getVaultMap()
        var emptyTemplates = vaultData.getEmptyTemplates()
        var vault_table = document.getElementById("vault_map")
        for (let i = 0; i <= 25; i++) {
            var newrow = document.createElement("tr")
            for (let j = 0; j <= 25; j++) {
                console.log(vault_map[i][j])
                var newelem = document.createElement("div")
                if (vault_map[i][j] != null) {
                    if (vault_map[i][j].hasOwnProperty("r")) {
                        newelem.classList.add("Rock")
                        newelem.classList.add("Tiny")
                    } else if (vault_map[i][j].class == "Filled") {
                        newelem.classList.add("None")
                    } else if (vault_map[i][j].class != "Utility") {
                        var roomName = vault_map[i][j].type ? vault_map[i][j].type : "empty"
                        var mergeLevel = vault_map[i][j].mergeLevel
                        var roomSize = mergeLevel == 1 ? "Small"
                            : mergeLevel == 2 ? "Medium"
                                : mergeLevel == 3 ? "Large"
                                    : "Tiny"
                        var width = vault_map[i][j].mergeLevel * 3
                        for (let x = 1; x < width; x++) {
                            vault_map[i][j + x] = emptyTemplates.Room
                        }
                        newelem.innerHTML = `<div class="Tooltip">${vault_map[i][j].type}</div>`
                        newelem.classList.add(roomName)
                        newelem.classList.add(roomSize)
                    } else if (vault_map[i][j].class == "Utility") {
                        var roomName = vault_map[i][j].type ? vault_map[i][j].type : "empty"
                        newelem.classList.add(roomName)
                        newelem.classList.add("Tiny")
                    }
                    var roomName = vault_map[i][j].type ? vault_map[i][j].type : "empty"
                    newelem.classList.add(roomName)
                } else {
                    newelem.classList.add("Tiny")
                }
                newrow.appendChild(newelem)
            }
            vault_table.appendChild(newrow)
        }
    } catch (error) {
        alert("Error: " + error)
    }
}

function showWSGData(type) {
    try {
        var wsg_data = vaultData.readSurvivalGuide(type)

        clearAll()
        var elem = document.createElement("div")
        elem.innerHTML = wsg_data
        var base = document.getElementById("main_reader")
        base.appendChild(elem)
    } catch (error) {
        alert("Error: " + error)
    }
}

function showParents() {
    try {
        const dwellers = vaultData.getDwellers()
        const dwellerMap = reverseParents(vaultData)

        var dweller_table = document.getElementById("dwellers")
        dweller_table.innerHTML = '<tr><th>Dweller</th><th>Gender</th><th>Rarity</th><th>Unique Data?</th></tr>'

        dwellers.forEach((dweller) => {
            var new_row = document.createElement("tr")

            var basic = document.createElement("td")
            basic.innerHTML = `${dweller.serializeId}. ${dweller.name} ${dweller.lastName}`

            var gender = document.createElement("td")
            gender.innerHTML = dweller.gender == 1 ? 'Female' : 'Male'

            var rarity = document.createElement("td")
            rarity.innerHTML = dweller.rarity

            var unique = document.createElement("td")
            unique.innerHTML = dweller.uniqueData

            new_row.appendChild(basic)
            new_row.appendChild(gender)
            new_row.appendChild(rarity)
            new_row.appendChild(unique)
            dweller_table.appendChild(new_row)
        })
    } catch (error) {
        alert("Error: " + error)
    }
}
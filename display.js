var vaultData = new VaultData()

function clearDwellers() {
    var dweller_table = document.getElementById("dwellers")
    dweller_table.innerHTML = '<tr><th>Dweller</th><th>Gender</th><th>Rarity</th><th>Unique Data?</th></tr>'
}

function clearVault() {
    var vault_table = document.getElementById("vault_map")
    vault_table.innerHTML = ''
}

function clearAll() {
    var main_section = document.getElementById("main_reader")
    var dweller_table = document.getElementById("dwellers")
    dweller_table.innerHTML = '<tr><th>Dweller</th><th>Gender</th><th>Rarity</th><th>Unique Data?</th></tr>'
    var vault_table = document.getElementById("vault_map")
    vault_table.innerHTML = ''
    main_section.innerHTML = ''
    main_section.appendChild(dweller_table)
    main_section.appendChild(vault_table)
}

function showDwellers() {
    const dwellers = vaultData.getDwellers()
    var dweller_table = document.getElementById("dwellers")

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
}

function showVault() {
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
}

function showWSGData(type) {
    var wsg_data = vaultData.readSurvivalGuide(type)

    clearAll()
    var elem = document.createElement("div")
    elem.innerHTML = wsg_data
    var base = document.getElementById("main_reader")
    base.appendChild(elem)
}

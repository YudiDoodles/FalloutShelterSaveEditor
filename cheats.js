function addLegendary(vaultData) {
    //For now will just add longfellow so I can test his name
    console.log(vaultData)
    var vaultStr = vaultData.getFullSave()
    var wasteland = vaultStr.vault.wasteland
    var numTeams = wasteland.teams.length
    var emptyTemplates = vaultData.getEmptyTemplates()
    var legendaryTemplate = emptyTemplates.LegendaryInfo
    var legendaryDwellers = vaultData.getLegendaryDwellers()
    var DeliveryMan = emptyTemplates.DeliveryMan
    var DeliveryMan_Wasteland = emptyTemplates.DeliveryMan_Wasteland

    var currLegendary = getByLabel(legendaryDwellers, "Old Longfellow")
    console.log(currLegendary)
    legendaryTemplate.DwellerExtraData.Name = currLegendary.Name
    legendaryTemplate.DwellerExtraData.LastName = currLegendary.LastName
    legendaryTemplate.DwellerExtraData.Gender = currLegendary.Gender
    legendaryTemplate.DwellerId = currLegendary.DwellerId

    DeliveryMan_Wasteland.teamEquipment.dwellers.push(legendaryTemplate)
    DeliveryMan_Wasteland.teamIndex = numTeams

    vaultStr.vault.wasteland.teams.push(DeliveryMan_Wasteland)
    vaultStr.dwellers.dwellers.push(DeliveryMan)

    console.log(vaultStr)
    encrypt(numTeams, "UpdatedVault.json", JSON.stringify(vaultStr))
}

function addManyLegendary(vaultData) {
    var checkedList = Array.from(document.getElementsByClassName("dwellerCheck"))
    console.log(checkedList)
    checkedList = filterArray(checkedList)
    console.log(checkedList)

    //console.log(vaultData)
    var vaultStr = vaultData.getFullSave()
    var wasteland = vaultStr.vault.wasteland
    var numTeams = wasteland.teams.length
    var emptyTemplates = vaultData.getEmptyTemplates()
    var legendaryTemplate = emptyTemplates.LegendaryInfo
    var legendaryDwellers = vaultData.getLegendaryDwellers()
    var DeliveryMan = emptyTemplates.DeliveryMan
    var DeliveryMan_Wasteland = emptyTemplates.DeliveryMan_Wasteland

    checkedList.forEach((checkedDweller) => {
        var currLegendary = getByName(legendaryDwellers, checkedDweller.id)
        var newLegendary = JSON.parse(JSON.stringify(emptyTemplates.LegendaryInfo))
        console.log(currLegendary)
        newLegendary.DwellerExtraData.Name = currLegendary.Name
        newLegendary.DwellerExtraData.LastName = currLegendary.LastName
        newLegendary.DwellerExtraData.Gender = currLegendary.Gender
        newLegendary.DwellerId = currLegendary.DwellerId
        console.log(newLegendary)

        DeliveryMan_Wasteland.teamEquipment.dwellers.push(newLegendary)
    })

    console.log(DeliveryMan_Wasteland.teamEquipment.dwellers)

    DeliveryMan_Wasteland.teamIndex = numTeams

    vaultStr.vault.wasteland.teams.push(DeliveryMan_Wasteland)
    vaultStr.dwellers.dwellers.push(DeliveryMan)

    //console.log(vaultStr)
    encrypt(numTeams, "UpdatedVault.json", JSON.stringify(vaultStr))
}

function getByName(items, name) {
    console.log(items)
    var foundDweller = ''
    items.dwellers.forEach((item) => {
        if (item.Name == name) {
            console.log(item)
            foundDweller = item
        }
    })
    return foundDweller
}

function getByLabel(items, label) {
    console.log(items)
    var foundDweller = ''
    items.dwellers.forEach((item) => {
        if (item.Label == label) {
            console.log(item)
            foundDweller = item
        }
    })
    return foundDweller
}

function filterArray(items) {
    var filtered = new Array()

    items.forEach((item) => {
        if (item.checked) {
            filtered.push(item)
        }
    })

    return filtered
}

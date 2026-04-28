function addLegendary(vaultData){
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

function getByLabel(items, label) {
    console.log(items)
    var foundDweller = ''
    items.dwellers.forEach((item) => {
        if(item.Label == label){
            console.log(item)
            foundDweller = item
        }
    })
    return foundDweller
}

var dwellerMap = new Map()

class SimpleDweller {
    constructor(dweller) {
        this.id = dweller.serializeId
        this.fullName = `${dweller.name} ${dweller.lastName}`
        this.fullDweller = dweller

        this.ascendants = dweller.relations.ascendants
        this.firstParent = this.ascendants[0]
        this.secondParent = this.ascendants[1]

        this.descendants = new Array()
        this.generationDepth = -1
    }
}

function reverseParents(vaultData) {
    var dwellers = vaultData.getDwellers()
    var negativeBois = new Map()
    dwellers.forEach((dweller) => {
        if (dweller.serializeId > 0) {
            dwellerMap.set(dweller.serializeId, new SimpleDweller(dweller))
        } else {
            negativeBois.set(dweller.serializeId, new SimpleDweller(dweller))
        }
    });

    dwellers.forEach((dweller) => {
        if (dweller.serializeId > 0) {
            var toChange = dwellerMap.get(dweller.serializeId)
            toChange.firstParent = dwellerMap.get(toChange.firstParent) != undefined ? dwellerMap.get(toChange.firstParent) : ''
            toChange.secondParent = dwellerMap.get(toChange.secondParent) != undefined ? dwellerMap.get(toChange.secondParent) : ''
            dwellerMap.set(dweller.serializeId, toChange)
        }
    });

    //iterate through every member of the map
    //for each entry that's not equal to -1 traverse to that entry and do it again
    //recursion nooooo
    //should return the updated map at each step
    //I thiiiink it's depth first? Since I'm going until I hit an end
    //optimization is for plebs we brute force like real men
    //should prolly also test how parentage works when parents are evicted so that I can be sure I'll hit a dead end

    var noParents = new Array()

    dwellerMap.forEach((dweller) => {
        if (dweller.generationDepth < 0) {
            var checkedDepth = checkParents(1, dweller, dweller.firstParent, dweller.secondParent)
            dweller.generationDepth = checkedDepth
        }
        if (dweller.firstParent != '') {
            dweller.firstParent.descendants.push(dweller.id)
        }
        if (dweller.secondParent != '') {
            dweller.secondParent.descendants.push(dweller.id)
        }
    })
    negativeBois.forEach((dweller) => {
        dweller.generationDepth = 1
        dwellerMap.set(dweller.id, dweller)
    })
    return dwellerMap
}

//This will be recursive as soon as I figure out recursion
function checkParents(currDepth, child, parent1 = '', parent2 = '') {
    //console.log(`Checking ${child.fullName} at ${currDepth} with parents ${parent1.fullName} and ${parent2.fullName}`)
    var par1 = parent1 != '' ? parent1.generationDepth : currDepth
    var par2 = parent2 != '' ? parent2.generationDepth : currDepth
    var greater
    //console.log(`${par1} ${par2}`)
    if (child.id < 0) {
        console.log("Broken boyyyy")
        greater = par1 > par2 ? par1 : par2
        return greater
    }
    if (parent1 != '' && par1 < currDepth + 1) {
        par1 = checkParents(currDepth, parent1, parent1.firstParent, parent2.secondParent) + 1
        parent1.generationDepth = par1 - 1
    }
    if (parent2 != '' && par2 < currDepth + 1) {
        par2 = checkParents(currDepth, parent2, parent1.firstParent, parent2.secondParent) + 1
        parent2.generationDepth = par2 - 1
    }

    greater = par1 > par2 ? par1 : par2
    return greater
}
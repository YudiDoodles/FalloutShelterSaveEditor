var vaultData = new VaultData()

class SimpleDweller{
    constructor(dweller){
        this.id = dweller.serializeId
        this.ascendants = dweller.ascendants
        this.fullName = `${dweller.name} ${dweller.lastName}`
        this.fullDweller = dweller
    }
}

function reverseParents(){
    var dwellers = vaultData.getDwellers()
    var simpleDwellers = new Map()

    dwellers.forEach((dweller) => {
        simpleDwellers.set(dweller.serializeId, new SimpleDweller(dweller))
    });

    //iterate through every member of the map
    //for each entry that's not equal to -1 traverse to that entry and do it again
    //recursion nooooo
    //should return the updated map at each step
    //I thiiiink it's depth first? Since I'm going until I hit an end
    //optimization is for plebs we brute force like real men
    //should prolly also test how parentage works when parents are evicted so that I can be sure I'll hit a dead end


}

//This will be recursive as soon as I figure out recursion
function checkParents(currMap, child, parent1, parent2){

}
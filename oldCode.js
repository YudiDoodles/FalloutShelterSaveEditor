function getRooms(){

    var map = new Array(25)
    for (let i = 0; i <= 25; i++) {
        map[i] = new Array(25)
    }

    var simple_map = new Array(25)
    for (let i = 0; i <= 25; i++) {
        simple_map[i] = new Array(25)
    }

    var rooms = full_save.vault.rooms
    rooms.forEach((room) => {
        map[room.row][room.col] = room
    })

    var rocks = full_save.vault.rocks
    rocks.forEach((rock) => {
        map[rock.r][rock.c] = rock
    })

    console.log(map)
    var vault_table = document.getElementById("vault_map")
    for (let i = 0; i <= 25; i++) {
        var newrow = document.createElement("tr")
        for (let j = 0; j <= 25; j++) {
            var newelem = document.createElement("td")
            if (map[i][j] != null) {
                if (map[i][j].hasOwnProperty("r")) {
                    newelem.classList.add("Rock")
                    newelem.classList.add("Tiny")
                } else if (map[i][j].class != "Utility") {
                    var roomName = map[i][j].type ? map[i][j].type : "empty"
                    var mergeLevel = map[i][j].mergeLevel
                    var roomSize = mergeLevel == 1 ? "Small"
                        : mergeLevel == 2 ? "Medium"
                            : mergeLevel == 3 ? "Large"
                                : "Tiny"
                    newelem.classList.add(roomName)
                    newelem.classList.add(roomSize)
                } else if (map[i][j].class = "Utility") {
                    var roomName = map[i][j].type ? map[i][j].type : "empty"
                    newelem.classList.add(roomName)
                    newelem.classList.add("Tiny")
                }
                var roomName = map[i][j].type ? map[i][j].type : "empty"
                newelem.classList.add(roomName)
            } else {
                newelem.classList.add("Tiny")
            }
            newrow.appendChild(newelem)
        }
        vault_table.appendChild(newrow)
    }
}

function getRoomSlots(){
    var map = new Array(25)
    for (let i = 0; i <= 25; i++) {
        map[i] = new Array(25)
    }
    
    var rooms = full_save.vault.rooms
    rooms.forEach((room) => {
        map[room.row][room.col] = room.type
        if (room.class != "Utility") {
            var width = room.mergeLevel * 3
            for (let i = 0; i < width; i++) {
                map[room.row][room.col + i] = room.type
            }
        }
    })

    var rocks = full_save.vault.rocks
    rocks.forEach((rock) => {
        map[rock.r][rock.c] = 'Rock'
    })

    console.log(map)
    var vault_table = document.getElementById("vault_map")
    for (let i = 0; i <= 25; i++) {
        var newrow = document.createElement("tr")
        for (let j = 0; j <= 25; j++) {
            var newelem = document.createElement("td")
            var roomName = map[i][j] ? map[i][j] : "empty"
            newelem.classList.add(roomName)
            newrow.appendChild(newelem)
        }
        vault_table.appendChild(newrow)
    }
}
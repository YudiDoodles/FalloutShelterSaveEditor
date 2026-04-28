class VaultData {
    constructor(fileName = 'Toppo', jsonSTR = '') {
        this.fileName = fileName
        this.full_save = ''
        this.emptyTemplates = ''
        this.legendaryDwellers = ''
        this.dwellers = ''
        this.rooms = ''
        this.vault_map = ''
        this.wsg_all = ''

        if (jsonSTR == '') {
            this.loadFile()
        } else {
            this.loadWithJSON(jsonSTR)
        }
    }

    async loadWithJSON(jsonSTR) {
        try {
            this.full_save = JSON.parse(jsonSTR)
        } catch (error) {
            alert("Error: " + error)
        }
        this.dwellers = this.full_save.dwellers.dwellers
        this.dwellers.sort(this.sortID)
        console.log(this.dwellers)

        this.wsg_all = this.full_save.survivalW

        this.rooms = this.full_save.vault.rooms
        this.vault_map = new Array(25)
        for (let i = 0; i <= 25; i++) {
            this.vault_map[i] = new Array(25)
        }

        this.rooms.forEach((room) => {
            this.vault_map[room.row][room.col] = room
        })

        var rocks = this.full_save.vault.rocks
        rocks.forEach((rock) => {
            this.vault_map[rock.r][rock.c] = rock
        })

        await fetch('Templates/emptyTemplates.json')
            .then(response => response.json()) // Parse JSON
            .then(data => this.emptyTemplates = data) // Work with JSON data
            .catch(error => console.error('Error fetching JSON:', error));

        await fetch('Templates/LegendaryDwellers.json')
            .then(response => response.json()) // Parse JSON
            .then(data => this.legendaryDwellers = data) // Work with JSON data
            .catch(error => console.error('Error fetching JSON:', error));
    }

    async loadFile() {
        var fileName = ''//document.getElementById("fileName").value
        fileName = 'Toppo'

        await fetch(`Saves/${fileName}.json`)
            .then(response => response.json()) // Parse JSON
            .then(data => this.full_save = data) // Work with JSON data
            .catch(error => console.error('Error fetching JSON:', error));
        this.dwellers = this.full_save.dwellers.dwellers
        this.dwellers.sort(this.sortID)

        this.wsg_all = this.full_save.survivalW

        this.rooms = this.full_save.vault.rooms
        this.vault_map = new Array(25)
        for (let i = 0; i <= 25; i++) {
            this.vault_map[i] = new Array(25)
        }

        this.rooms.forEach((room) => {
            this.vault_map[room.row][room.col] = room
        })

        var rocks = this.full_save.vault.rocks
        rocks.forEach((rock) => {
            this.vault_map[rock.r][rock.c] = rock
        })

        await fetch('Templates/emptyTemplates.json')
            .then(response => response.json()) // Parse JSON
            .then(data => this.emptyTemplates = data) // Work with JSON data
            .catch(error => console.error('Error fetching JSON:', error));
    }

    sortID(dwellera, dwellerb) {
        if (dwellera.serializeId < dwellerb.serializeId) {
            return -1;
        } else if (dwellera.serializeId > dwellerb.serializeId) {
            return 1;
        } else {
            0
        }
    }

    getDwellers() {
        return this.dwellers
    }

    getVaultMap() {
        return this.vault_map
    }

    getEmptyTemplates() {
        return this.emptyTemplates
    }

    getLegendaryDwellers() {
        return this.legendaryDwellers
    }

    getFullSave() {
        return this.full_save
    }

    readSurvivalGuide(type) {
        var data = this.wsg_all[type]
        data = this.separateWSG(data)
        data.sort((a, b) => {
            return a[1] - b[1]
        })
        return data
    }

    separateWSG(items) {
        var parsedList = new Array()
        items.forEach((item) => {
            var letter = item.substring(0, 1)
            var index = item.substring(1)
            parsedList.push([letter, index])
        })
        console.log(parsedList)
        return parsedList
    }
}
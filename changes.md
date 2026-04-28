1. Set "FakeWasteland" to "Enclave"
    {
        "specialTheme":{
            "themeByRoomType": {
                "FakeWasteland": "Enclave"
            }
        }
    }

2. Set "canShowSeasonButton" to 1
    {
        "tutorialManager":{
            "canShowSeasonButton": 1
        }
    }

3. In survivalW > collectedThemes > themeList, add in this line (will need a comma if before or after other themes):
        {
          "id": "EnclaveExterior",
          "type": "Theme",
          "hasBeenAssigned": false,
          "hasRandonWeaponBeenAssigned": false,
          "extraData": {
            "partsCollectedCount": 9,
            "IsCraftingInProgress": false,
            "IsCrafted": true,
            "IsClaimed": true,
            "IsClaimedInCraftingRoom": true,
            "IsNew": false
          }
        }

4. Replace whatever your seasonEventData is with the below:
  "seasonEventData": {
    "currentEvent": 0,
    "nextEventTime": "1/1/0001 12:00:00 AM",
    "claimedEvents": [],
    "areAllSeasonEventsClaimed": false,
    "isNewQuestUnlocked": false
  }

5. Replace whatever your dayToDayRewardMgr is with below: 
  "dayToDayRewardMgr": {
    "states": [
      {
        "type": 14,
        "next": 1776492000000
      }
    ]
  }

6. Set seasonId to "Enclave"
    "seasonId": "Enclave"
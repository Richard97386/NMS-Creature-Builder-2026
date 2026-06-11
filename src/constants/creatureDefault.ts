import { CreatureSave } from '../contracts/creatureSave'; 
import { dateToEpoch, friendlyDate } from '../helper/dateHelper'; 

export const noDescriptorOptionKey = '_NO_OPTION_'; 

// 🎯 UPDATED: Accepts the toggle state parameter from the UI component
export const defaultPetJson = (useClassOverrides: boolean = false): CreatureSave => { 
  const timeInEpoch = dateToEpoch(friendlyDate()); 
  
  return { 
    Scale: 5.0, 
    CreatureID: '^', 
    Descriptors: [ '^000000000' ], 
    CreatureSeed: [ true, '0x0000000000000000' ], 
    CreatureSecondarySeed: [ true, '0x0000000000000000' ], 
    SpeciesSeed: '0x0000000000000000', 
    GenusSeed: '0x0000000000000000', 
    CustomSpeciesName: '^', 
    Predator: true, 
    UA: '0x10010011111111', 
    AllowUnmodifiedReroll: true, 
    ColourBaseSeed: [ true, '0x0000000000000000' ], 
    BoneScaleSeed: [ true, '0x0000000000000000' ], 
    HasFur: false, 
    Biome: { Biome: 'Lush' }, 
    CreatureType: { CreatureType: 'None' }, 
    BirthTime: timeInEpoch, 
    LastEggTime: timeInEpoch + 24886800, 
    LastTrustIncreaseTime: timeInEpoch + 32089050, 
    LastTrustDecreaseTime: timeInEpoch + 32140796, 
    EggModified: false, 
    HasBeenSummoned: true, 
    CustomName: '^', 
    Trust: 0.699999988079071, 
    SenderData: { LID: '', UID: '', USN: '', PTK: '', TS: 0 }, 
    Traits: [ 0.8999999761581421, 0, 0 ], 
    Moods: [ 0.003156597726047039, 0.00886062067002058 ],

    // 🎯 DYNAMIC TOGGLE OVERRIDE BINDING: Respects user selection with 'false' default baseline
    PetBattlerUseCoreStatClassOverrides: useClassOverrides,
    PetBattlerCoreStatClassOverrides: [
        { InventoryClass: 'S' },
        { InventoryClass: 'S' },
        { InventoryClass: 'S' }
    ],
    PetBattlerTreatsEaten: [10, 10, 10],
    PetBattlerTreatsAvailable: 20,
    PetBattleProgressToTreat: 0,
    PetBattlerVictories: 0,
    PetBattlerMoveList: [
        { MoveTemplateID: '^', Cooldown: 0, ScoreBoost: 0 },
        { MoveTemplateID: '^', Cooldown: 0, ScoreBoost: 0 },
        { MoveTemplateID: '^', Cooldown: 0, ScoreBoost: 0 },
        { MoveTemplateID: '^', Cooldown: 0, ScoreBoost: 0 },
        { MoveTemplateID: '^', Cooldown: 0, ScoreBoost: 0 }
    ],
    PetBattlerMoves: [
        '^ATTACK_AFF',
        '^AFF_SPEED_ME',
        '^ATTACK_SELFDOT',
        '^SELF_HEAL',
        '^SELF_RESET_CD'
    ]
  }; 
}

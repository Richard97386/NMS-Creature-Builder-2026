export interface CreatureSave {
  Scale: number;
  CreatureID: string;
  Descriptors: string[];
  CreatureSeed: (string | boolean)[];
  CreatureSecondarySeed: (string | boolean)[]; 
  SpeciesSeed: string;
  GenusSeed: string;
  CustomSpeciesName: string;
  Predator: boolean;
  UA: string | number;
  AllowUnmodifiedReroll: boolean;
  ColourBaseSeed: (string | boolean)[];
  BoneScaleSeed: (string | boolean)[];
  HasFur: boolean;
  Biome: { Biome: string };
  CreatureType: { CreatureType: string };
  BirthTime: number;
  LastEggTime: number;
  LastTrustIncreaseTime: number;
  LastTrustDecreaseTime: number;
  EggModified: boolean;
  HasBeenSummoned: boolean;
  CustomName: string;
  Trust: number;
  SenderData: {
    LID: string;
    UID: string;
    USN: string;
    PTK: string;
    TS: number;
  };
  Traits: number[];
  Moods: number[];

  // VERIFIED COMPONENT BATTLE AND OVERRIDE DECLARATIONS
  PetBattlerUseCoreStatClassOverrides?: boolean;
  PetBattlerCoreStatClassOverrides?: Array<{ InventoryClass: string }>;
  PetBattlerTreatsEaten?: number[];
  PetBattlerTreatsAvailable?: number;
  PetBattleProgressToTreat?: number;
  PetBattlerVictories?: number;
  PetBattlerMoveList?: Array<{ MoveTemplateID: string; Cooldown: number; ScoreBoost: number }>;
  PetBattlerMoves?: string[];
}

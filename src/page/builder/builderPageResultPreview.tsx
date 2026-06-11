import { Box, Flex, Text, Textarea } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PetMainDetails } from '../../contracts/petDetails';
import { CreatureSave } from '../../contracts/creatureSave';

interface IProps {
  selectedPet: PetMainDetails;
  mappingString: string;
  descriptorId: string;
  settings: any; 
  setSettings?: any;
  getJsonFromMappings: (mappingString: string) => string;
  getMappingsFromJson: (event: any) => void;
  saveJson: CreatureSave; 
}

export const BuilderPageResultPreview: React.FC<IProps> = (props: IProps) => {
  const [displayString, setDisplayString] = useState<string>('');

  useEffect(() => {
    // 🎯 CONFIGURATION CHECK: If the user toggles 'Show output JSON' to false, hide the text block execution entirely
    if (props.settings.showJsonPreview === false) {
      setDisplayString('');
      return;
    }

    let rawJson = props.getJsonFromMappings(props.mappingString + ',' + props.descriptorId);
    
    if (rawJson) {
      try {
        const parsed = JSON.parse(rawJson);
        
        // 🎯 MASTER RE-RENDER PROPERTIES SYNC MATRIX
        parsed.Scale = props.saveJson.Scale ?? parsed.Scale;
        parsed.CustomName = props.saveJson.CustomName ?? parsed.CustomName;
        parsed.Trust = props.saveJson.Trust ?? parsed.Trust;
        parsed.Traits = props.saveJson.Traits ?? parsed.Traits;
        parsed.Moods = props.saveJson.Moods ?? parsed.Moods;
        parsed.HasFur = props.saveJson.HasFur ?? parsed.HasFur;
        parsed.CustomSpeciesName = props.saveJson.CustomSpeciesName ?? parsed.CustomSpeciesName;
        parsed.BirthTime = props.saveJson.BirthTime ?? parsed.BirthTime;
        parsed.LastEggTime = props.saveJson.LastEggTime ?? parsed.LastEggTime;

        parsed.Biome = props.saveJson.Biome ?? parsed.Biome;
        parsed.CreatureType = props.saveJson.CreatureType ?? parsed.CreatureType;
        parsed.Predator = props.saveJson.Predator ?? parsed.Predator;
        parsed.EggModified = props.saveJson.EggModified ?? parsed.EggModified;
        parsed.HasBeenSummoned = props.saveJson.HasBeenSummoned ?? parsed.HasBeenSummoned;
        parsed.AllowUnmodifiedReroll = props.saveJson.AllowUnmodifiedReroll ?? parsed.AllowUnmodifiedReroll;

        parsed.CreatureSeed = props.saveJson.CreatureSeed ?? parsed.CreatureSeed;
        parsed.CreatureSecondarySeed = props.saveJson.CreatureSecondarySeed ?? parsed.CreatureSecondarySeed;
        parsed.SpeciesSeed = props.saveJson.SpeciesSeed ?? parsed.SpeciesSeed;
        parsed.GenusSeed = props.saveJson.GenusSeed ?? parsed.GenusSeed;
        parsed.UA = props.saveJson.UA ?? parsed.UA;
        parsed.ColourBaseSeed = props.saveJson.ColourBaseSeed ?? parsed.ColourBaseSeed;
        parsed.BoneScaleSeed = props.saveJson.BoneScaleSeed ?? parsed.BoneScaleSeed;

        parsed.LastTrustIncreaseTime = props.saveJson.LastTrustIncreaseTime ?? parsed.LastTrustIncreaseTime;
        parsed.LastTrustDecreaseTime = props.saveJson.LastTrustDecreaseTime ?? parsed.LastTrustDecreaseTime;

        parsed.PetBattlerUseCoreStatClassOverrides = !!props.settings.useCoreStatClassOverrides;
        
        rawJson = JSON.stringify(parsed, null, 4);
      } catch (err) {}
    }

    setDisplayString(rawJson);
    
  }, [
    props.selectedPet, 
    props.mappingString, 
    props.descriptorId, 
    props.settings.useCoreStatClassOverrides,
    // 🎯 RE-RENDER TRIGGERS FOR THE INTERACTIVE DISPLAY SWITCHES
    props.settings.showJsonPreview,
    props.settings.showModelPreview,
    
    props.saveJson.Scale,
    props.saveJson.CustomName,
    props.saveJson.Trust,
    props.saveJson.Traits,
    props.saveJson.Moods,
    props.saveJson.HasFur,
    props.saveJson.CustomSpeciesName,
    props.saveJson.BirthTime,
    props.saveJson.LastEggTime,
    props.saveJson.Biome,
    props.saveJson.CreatureType,
    props.saveJson.Predator,
    props.saveJson.EggModified,
    props.saveJson.HasBeenSummoned,
    props.saveJson.AllowUnmodifiedReroll,
    props.saveJson.CreatureSeed,
    props.saveJson.CreatureSecondarySeed,
    props.saveJson.SpeciesSeed,
    props.saveJson.GenusSeed,
    props.saveJson.UA,
    props.saveJson.ColourBaseSeed,
    props.saveJson.BoneScaleSeed,
    props.saveJson.LastTrustIncreaseTime,
    props.saveJson.LastTrustDecreaseTime
  ]);

  // If the toggle 'Show output JSON' is disabled, return empty framework spacing layout blocks
  if (props.settings.showJsonPreview === false) {
    return <Box flex="0" />;
  }

  return (
    <Box flex="12" bg="gray.900" p="4" borderRadius="md" border="1px solid" borderColor="gray.700">
      <Flex justify="space-between" align="center" mb="2">
        <Text fontWeight="bold" color="purple.300">Generated Save Editor JSON String</Text>
      </Flex>
      
      <Textarea
        value={displayString}
        onChange={props.getMappingsFromJson}
        fontFamily="mono"
        fontSize="sm"
        minH="450px"
        bg="gray.950"
        color="green.300"
        borderColor="gray.800"
      />
    </Box>
  );
};

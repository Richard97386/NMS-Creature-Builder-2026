import React, { useState } from 'react';
import { Button, Box, Spacer, Wrap, WrapItem } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { ISettingOptionAttrMapping, ISettingOptionCompProps } from '../../components/setting/settingCommon';
import { SettingSwitch } from '../../components/setting/settingSwitch';
import { controlSpacing } from '../../constants/UIConstant';

export interface IBuilderPageSettings {
  showSimplifiedNames: boolean;
  advancedMode: boolean;
  showJsonPreview: boolean;
  showModelPreview: boolean;
  showPetAccessory: boolean;
  showStats: boolean;
  lowQualityMode: boolean;
  useCoreStatClassOverrides: boolean;
}

export const initialSettings: IBuilderPageSettings = {
  showSimplifiedNames: false,
  advancedMode: false,
  showJsonPreview: true,
  showModelPreview: true,
  showPetAccessory: false,
  showStats: false,
  lowQualityMode: false,
  useCoreStatClassOverrides: false,
}

interface ISettingOption {
  id: string,
  propName: string,
  label: string,
  additionalProps?: ISettingOptionAttrMapping;
  show?: (currentSettings: IBuilderPageSettings) => boolean;
  component: React.FC<ISettingOptionCompProps<any>>,
}

interface IProps {
  settings: IBuilderPageSettings;
  getCurrentJson: () => string;
  triggerJsonInterval: () => void;
  getMappingsFromJson: (event: any) => void;
  setSettings: (func: (newState: IBuilderPageSettings) => IBuilderPageSettings) => void;
}

export const BuilderPageSettingsRow: React.FC<IProps> = (props: IProps) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [toggleState, setToggleState] = useState<boolean>(false);

  // CORE SETTINGS ROW ARRAY: Places the switch inline with your standard switches
  const settingOptions: Array<ISettingOption> = [
    { 
      id: 'showJsonPreview', 
      propName: 'showJsonPreview', 
      label: 'Show output JSON', 
      component: SettingSwitch, 
      additionalProps: { width: '250px' } 
    },
    { 
      id: 'showModelPreview', 
      propName: 'showModelPreview', 
      label: 'Show model preview', 
      component: SettingSwitch, 
      additionalProps: { width: '250px' } 
    },
    { 
      id: 'advancedMode', 
      propName: 'advancedMode', 
      label: 'Enable Advanced Mode', 
      component: SettingSwitch 
    },
  ];

  const advancedOptions: Array<ISettingOption> = [
    { id: 'lowQualityMode', propName: 'lowQualityMode', label: 'Reduce preview quality', component: SettingSwitch },
    { id: 'showStats', propName: 'showStats', label: 'Show FPS', component: SettingSwitch },
  ];

  // 🎯 THE AUTOMATIC FORWARDER: Safely bridges the toggle back up to your parent state pipeline
  const handleToggleChange = (newValue: boolean) => {
    setToggleState(newValue);
    
    props.setSettings((prev: IBuilderPageSettings) => {
      const updated = { ...prev, useCoreStatClassOverrides: newValue };
      
      // Delay string processing by 10ms to let state settle before force-updating the display box
      setTimeout(() => {
        props.triggerJsonInterval();
      }, 10);
      
      return updated;
    });
  };

  const renderSettingOption = (opt: ISettingOption) => {
    const Comp = opt.component;
    const value = (props.settings as any)?.[opt.propName];
    return (
      <WrapItem key={opt.id} className='pointer'>
        <Comp 
          id={opt.id} 
          label={opt.label} 
          value={value} 
          getCurrentJson={props.getCurrentJson}
          onChange={(newValue: any) => {
            props.setSettings((prev: IBuilderPageSettings) => ({ ...prev, [opt.propName]: newValue }));
            props.triggerJsonInterval();
          }} 
        />
      </WrapItem>
    );
  }

  return (
    <Box mt="2" mb="4">
      {/* Main Row Toggles */}
      <Wrap mb="3" spacing={controlSpacing / 2}>
        {settingOptions.map(renderSettingOption)}

        {/* The Toggle switch sits inline with your standard row options */}
        <WrapItem className='pointer'>
          <SettingSwitch 
            id="useCoreStatClassOverrides"
            label="Use Core Stat Class Overrides"
            value={props.settings.useCoreStatClassOverrides ?? toggleState}
            getCurrentJson={props.getCurrentJson}
            onChange={handleToggleChange}
          />
        </WrapItem>

        <Spacer />
        <WrapItem>
          <Button rightIcon={<SettingsIcon />} size="sm" onClick={() => setShowSettings(prev => !prev)}>
            {showSettings ? 'Hide' : 'Show'} additional settings
          </Button>
        </WrapItem>
      </Wrap>

      {/* Collapsible Advanced Panel Tray */}
      {showSettings && (
        <Wrap mt="2" p="3" bg="gray.800" borderRadius="md" spacing={controlSpacing}>
          {advancedOptions.map(renderSettingOption)}
        </Wrap>
      )}
    </Box>
  );
}

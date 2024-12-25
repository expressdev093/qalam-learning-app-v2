/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {View, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {MCQOption} from './type';
import {RadioButton} from './radio-button';

interface RadioButtonGroupProps {
  options: MCQOption[];
  selectedValue?: MCQOption;
  onValueChange: (option: MCQOption) => void;
  accessoryCorrect?: (option: MCQOption) => React.ReactNode;
  accessoryWrong?: (option: MCQOption) => React.ReactNode;
  checkedBackgroundColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  correctOption?: MCQOption;
  disabled?: boolean;
}

export const RadioButtonGroup = ({
  options,
  selectedValue,
  onValueChange,
  accessoryCorrect,
  checkedBackgroundColor,
  correctOption,
  accessoryWrong,
  disabled,
}: RadioButtonGroupProps) => {
  const handleSelect = (option: MCQOption) => {
    onValueChange(option);
  };

  return (
    <View>
      {options.map(option => (
        <RadioButton
          key={option.value}
          option={option}
          isSelected={option.value === selectedValue?.value}
          onSelect={handleSelect}
          accessoryCorrect={accessoryCorrect}
          accessoryWrong={accessoryWrong}
          checkedBackgroundColor={checkedBackgroundColor}
          correctOption={correctOption}
          isCorrect={correctOption?.id === selectedValue?.id}
          disabled={disabled}
        />
      ))}
    </View>
  );
};

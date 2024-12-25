/* eslint-disable react/react-in-jsx-scope */
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {MCQOption} from './type';
import {Fragment} from 'react';

function getContrastYIQ(hexcolor: string) {
  var r = parseInt(hexcolor.substring(1, 3), 16);
  var g = parseInt(hexcolor.substring(3, 5), 16);
  var b = parseInt(hexcolor.substring(5, 7), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'white' : 'black';
}

interface RadioButtonProps {
  option: MCQOption;
  isSelected: boolean;
  accessoryCorrect?: (option: MCQOption) => React.ReactNode;
  accessoryWrong?: (option: MCQOption) => React.ReactNode;
  checkedBackgroundColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  onSelect: (option: MCQOption) => void;
  correctOption?: MCQOption;
  isCorrect?: boolean;
  disabled?: boolean;
}

export const RadioButton = ({
  option,
  isSelected,
  accessoryCorrect,
  accessoryWrong,
  checkedBackgroundColor,
  labelStyle,
  onSelect,
  correctOption,
  isCorrect,
  disabled,
}: RadioButtonProps) => {
  const renderChecked = isSelected ? (
    isCorrect ? (
      accessoryCorrect?.(option)
    ) : (
      accessoryWrong?.(option)
    )
  ) : (
    <Fragment></Fragment>
  );
  const backgroundColor = isSelected
    ? checkedBackgroundColor ?? '#fff'
    : '#fff';
  const borderColor = isSelected
    ? checkedBackgroundColor ?? '#EFEEFC'
    : '#EFEEFC';

  const backgroundColorAfterCorrectionCheck = isCorrect
    ? backgroundColor
    : '#fff';

  const borderColorAfterCorrectionCheck = isSelected
    ? isCorrect
      ? borderColor
      : 'red'
    : '#EFEEFC';

  const textColor = getContrastYIQ(backgroundColorAfterCorrectionCheck);

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.radioButton,
        {
          backgroundColor: backgroundColorAfterCorrectionCheck,
          borderColor: borderColorAfterCorrectionCheck,
        },
      ]}
      onPress={() => onSelect(option)}>
      <Text style={[styles.radioButtonText, {color: textColor}, labelStyle]}>
        {option.label}
      </Text>
      {isSelected && renderChecked}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderColor: '#EFEEFC',
  },
  radioButtonText: {
    fontSize: 16,
    marginLeft: 10,
  },
  radioButtonSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#007aff',
    marginLeft: 10,
  },
});

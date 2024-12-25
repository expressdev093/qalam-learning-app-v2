/* eslint-disable react-hooks/exhaustive-deps */
import {Layout, Text, useStyleSheet} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {StyleSheet, Image, useWindowDimensions, View} from 'react-native';
import {
  IQuizMCQAnswer,
  IQuizMcq,
  IQuizMcqOption,
  IUserQuizAnswer,
} from '../../../interfaces';
import {MCQOption} from '../../../components/radio-button/type';
import {RadioButtonGroup} from '../../../components/radio-button';
import {Colors} from '../../../constants/colors';
import {Icon} from '../../../components/icon';

export interface ISlide {
  id: string;
  title: string;
  description: string;
}

interface IProps {
  quizMcq: IQuizMcq;
  index: number;
  total: number;
  onAnswerdCallback: (quizMcqAnswer: IQuizMCQAnswer) => void;
  defaultSelectedOption?: IUserQuizAnswer;
}

// const options: MCQOption[] = [
//   {value: 'option1', label: 'Option 1', id: 1, isCorrect: true},
//   {value: 'option2', label: 'Option 2', id: 2, isCorrect: false},
//   {value: 'option3', label: 'Option 3', id: 3, isCorrect: false},
//   {value: 'option4', label: 'Option 4', id: 4, isCorrect: false},
// ];

export const QuizMcqItem: React.FC<IProps> = ({
  quizMcq,
  index,
  total,
  onAnswerdCallback,
  defaultSelectedOption,
}) => {
  const {width} = useWindowDimensions();
  const styles = useStyleSheet(themedStyle);
  const [selectedValue, setSelectedValue] = React.useState<MCQOption>();

  const options: MCQOption[] = quizMcq.options.map(option => ({
    value: option.id,
    label: option.text,
    id: option.id,
    isCorrect: option.isCorrect,
  }));

  const correctOption = options.find(o => o.isCorrect);

  const handleValueChange = (option: MCQOption) => {
    setSelectedValue(option);
    onAnswerdCallback({
      quizMcq: quizMcq,
      answerOption: quizMcq.options?.find(op => op.id === option.id)!,
      isAnswerCorrect: option.isCorrect,
    });
  };

  useEffect(() => {
    if (defaultSelectedOption) {
      const defaultOp = options.find(
        o => o.id === defaultSelectedOption.selectedOptionId,
      );
      setSelectedValue(defaultOp);
    }
  }, [defaultSelectedOption]);

  return (
    <Layout style={[styles.container, styles.card, {width: width - 20}]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>
          QUESTION {index + 1} OF {total}
        </Text>
      </View>
      <Text category="h5" style={styles.question}>
        {quizMcq.text}
      </Text>
      <View style={{marginTop: 20}}>
        <RadioButtonGroup
          disabled={selectedValue !== undefined}
          options={options}
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          checkedBackgroundColor={Colors.secondary3}
          accessoryCorrect={option => (
            <Icon name="check" pack="feather" size={28} color="white" />
          )}
          accessoryWrong={option => (
            <Icon
              name="close"
              pack="material-community"
              size={28}
              color="red"
            />
          )}
          correctOption={correctOption}
        />
      </View>
    </Layout>
  );
};

const themedStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
  },
  question: {
    marginTop: 10,
  },
  description: {
    fontWeight: '300',
    color: 'color-priamry-500',
  },
  time: {
    color: 'color-primary-500',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 40,
    margin: 10,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Button, { ButtonContainer } from '../components/Button';
import Alert from '../components/Alert';

import TEMP_QUESTIONS from '../data/computers';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#36B1f0',
    flex: 1,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    letterSpacing: -0.02,
    fontWeight: '600',
  },
  safearea: {
    flex: 1,
    marginTop: 100,
    justifyContent: 'space-between',
  },
});
const Quiz = () => {
  const [state, setState] = useState({
    correctCount: 0,
    totalCount: TEMP_QUESTIONS.length,
    activeQuestionIdx: 0,
    answered: false,
    answerCorrect: false,
  });

  useEffect(() => {
    const interval = setTimeout(() => nextQuestion(), 750);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.answerCorrect]);

  console.log(state);
  let question = TEMP_QUESTIONS[state.activeQuestionIdx];

  const nextQuestion = () => {
    setState((prev) => {
      let nextIdx = prev.activeQuestionIdx + 1;

      if (nextIdx >= state.totalCount) {
        nextIdx = 0;
      }
      return {
        ...prev,
        activeQuestionIdx: nextIdx,
        answered: !prev.answered,
      };
    });
  };

  const answerQuestion = (correct) => {
    setState((prevState) => {
      const nextState = { answered: true };

      if (correct) {
        nextState.correctCount = state.correctCount + 1;
        nextState.answerCorrect = true;
      } else {
        nextState.answerCorrect = false;
      }
      return { ...prevState, ...nextState };
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safearea}>
        <View>
          <Text style={styles.text}>{question.question}</Text>
          <ButtonContainer>
            {question.answers.map((answer) => (
              <Button
                key={answer.id}
                text={answer.text}
                onPress={() => answerQuestion(answer.correct)}
              />
            ))}
          </ButtonContainer>
        </View>
        <Text
          style={styles.text}
        >{`${state.correctCount}/${state.totalCount}`}</Text>
      </SafeAreaView>
      <Alert correct={state.answerCorrect} visible={state.answered} />
    </View>
  );
};

export default Quiz;

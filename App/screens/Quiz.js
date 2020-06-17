import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Button, { ButtonContainer } from '../components/Button';

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
  });

  useEffect(() => {
    if (state.correctCount) {
      nextQuestion();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.correctCount]);

  console.log(state);
  let question = TEMP_QUESTIONS[state.activeQuestionIdx];

  const nextQuestion = () => {
    setState((prev) => {
      let nextIdx = prev.activeQuestionIdx + 1;
      console.log('nextIdx ', nextIdx);
      if (nextIdx >= state.totalCount) {
        nextIdx = 0;
      }
      return {
        ...prev,
        activeQuestionIdx: nextIdx,
      };
    });
  };

  const answerQuestion = (correct) => {
    setState((prevState) => {
      let nextState = 0;
      if (correct) {
        nextState = state.correctCount + 1;
      }
      return { ...prevState, correctCount: nextState };
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
    </View>
  );
};

export default Quiz;

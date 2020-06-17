import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import Button, { ButtonContainer } from '../components/Button';
import Alert from '../components/Alert';

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
  scoreText: {
    marginBottom: 10,
  },
});

const Quiz = ({ route, title }) => {
  const [state, setState] = useState({
    correctCount: 0,
    totalCount: route.params.questions.length,
    activeQuestionIdx: 0,
    answerCorrect: false,
  });

  const [answered, setAnswered] = useState(false);

  const questions = route.params.questions;
  const question = questions[state.activeQuestionIdx];

  useEffect(() => {
    const interval = setTimeout(() => setAnswered(false), 750);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answered]);

  useEffect(() => {
    nextQuestion();
  }, [state.answerCorrect, state.correctCount]);

  const nextQuestion = () => {
    setState((prev) => {
      let nextIdx = prev.activeQuestionIdx;

      if (prev.answerCorrect) {
        nextIdx = nextIdx + 1;
      }

      if (nextIdx >= state.totalCount) {
        nextIdx = 0;
      }
      console.log('Next question:');
      console.log({ ...prev, activeQuestionIdx: nextIdx });
      return {
        ...prev,
        activeQuestionIdx: nextIdx,
      };
    });
  };

  const answerQuestion = (correct) => {
    setState((prevState) => {
      const nextState = {};
      setAnswered(true);

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
    <View style={[styles.container, { backgroundColor: route.params.color }]}>
      <StatusBar barStyle="dark-content" />
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
          style={[styles.text, styles.scoreText]}
        >{`${state.correctCount}/${state.totalCount}`}</Text>
      </SafeAreaView>
      <Alert correct={state.answerCorrect} visible={answered} />
    </View>
  );
};

export default Quiz;

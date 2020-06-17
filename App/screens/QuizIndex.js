import React from 'react';
import { View, Button, StatusBar, ScrollView } from 'react-native';

import spaceQuestions from '../data/space';
import computersQuestions from '../data/computers';
import westernsQuestions from '../data/westerns';
import RowItem from '../components/RowItem';

const QuizIndex = ({ navigation }) => {
  return (
    <ScrollView>
      <StatusBar barStyle={'dark-content'} />
      <RowItem
        name="Space"
        color="#36baf0"
        onPress={() =>
          navigation.navigate('Quiz', {
            title: 'Space',
            questions: spaceQuestions,
            color: '#36baf0',
          })
        }
      />
      <RowItem
        name="Westerns"
        color="#799496"
        onPress={() =>
          navigation.navigate('Quiz', {
            title: 'Westerns',
            questions: westernsQuestions,
            color: '#799496',
          })
        }
      />
      <RowItem
        name="Computers"
        color="#49475b"
        onPress={() =>
          navigation.navigate('Quiz', {
            title: 'Computers',
            questions: computersQuestions,
            color: '#49475b',
          })
        }
      />
    </ScrollView>
  );
};

export default QuizIndex;

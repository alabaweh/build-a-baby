import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 15px;
  color: #333;
`;

const Description = styled.p`
  margin-bottom: 20px;
  color: #666;
  font-style: italic;
`;

const QuestionContainer = styled.div`
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const Question = styled.h4`
  margin-bottom: 10px;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  
  ${props => props.selected && `
    background-color: #4a90e2;
    color: white;
    border-color: #4a90e2;
  `}
  
  &:hover {
    background-color: ${props => props.selected ? '#4a90e2' : '#f0f0f0'};
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const CleanlinessQuiz = ({ updateBabyData }) => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null
  });
  
  const questions = [
    {
      id: 'q1',
      text: 'What does your dorm room look like right now?',
      subtitle: '"Because cleanliness is next to genetic worthiness."',
      options: [
        { text: 'Spotless. I vacuum for fun.', value: 90 },
        { text: 'Pretty clean, if you ignore the laundry chair.', value: 75 },
        { text: 'Organized chaos — I know where my stuff is.', value: 60 },
        { text: "Can't see the floor, but there's character.", value: 25 }
      ]
    },
    {
      id: 'q2',
      text: 'How often do you change your bedsheets (be honest)?',
      options: [
        { text: "Once a week. I'm not a monster.", value: 85 },
        { text: 'When I remember. Maybe biweekly?', value: 70 },
        { text: 'Once a month. Is that bad?', value: 50 },
        { text: 'Uhh… I plead the fifth.', value: 30 },
        { text: 'Never. The skin cells add warmth.', value: 15 }
      ]
    },
    {
      id: 'q3',
      text: 'How do you usually clean up before guests come over?',
      options: [
        { text: 'Deep clean, light candles, hide the clutter.', value: 90 },
        { text: 'Throw everything in the closet and hope for the best.', value: 70 },
        { text: 'Wipe surfaces and Febreze the air.', value: 60 },
        { text: "I don't. They just need to accept me.", value: 20 }
      ]
    }
  ];
  
  const handleOptionSelect = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Calculate average cleanliness index if all questions are answered
    const newAnswers = { ...answers, [questionId]: value };
    const answeredQuestions = Object.values(newAnswers).filter(answer => answer !== null);
    
    if (answeredQuestions.length === questions.length) {
      const sum = answeredQuestions.reduce((acc, curr) => acc + curr, 0);
      const average = Math.round(sum / questions.length);
      updateBabyData({ cleanlinessIndex: average });
    }
  };
  
  const calculateAverage = () => {
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null);
    if (answeredQuestions.length === 0) return 0;
    
    const sum = answeredQuestions.reduce((acc, curr) => acc + curr, 0);
    return Math.round(sum / answeredQuestions.length);
  };
  
  const average = calculateAverage();
  
  return (
    <Container>
      <Title>Cleanliness Index Assessment</Title>
      <Description>
        Your cleanliness habits are used to determine your baby's "genetic cleanliness potential."
        This satirical metric exposes the absurdity of correlating personal habits with genetic worth.
      </Description>
      
      {questions.map(question => (
        <QuestionContainer key={question.id}>
          <Question>{question.text}</Question>
          {question.subtitle && <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>{question.subtitle}</p>}
          
          <Options>
            {question.options.map((option, index) => (
              <Option 
                key={index}
                selected={answers[question.id] === option.value}
                onClick={() => handleOptionSelect(question.id, option.value)}
              >
                {option.text} {answers[question.id] === option.value && `(${option.value} points)`}
              </Option>
            ))}
          </Options>
        </QuestionContainer>
      ))}
      
      <ResultContainer>
        <h4>Current Cleanliness Index: {average}</h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          {average >= 80 ? "Exceptional cleanliness. Prime genetic material." : 
           average >= 60 ? "Acceptable cleanliness. Genetically viable." : 
           average >= 40 ? "Concerning cleanliness habits. Genetic monitoring advised." : 
           "Severe cleanliness deficiency. Reproduction not recommended."}
        </p>
      </ResultContainer>
    </Container>
  );
};

export default CleanlinessQuiz; 
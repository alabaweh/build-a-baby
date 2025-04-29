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

const IQQuiz = ({ updateBabyData }) => {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null
  });
  
  const questions = [
    {
      id: 'q1',
      text: "You're in an unfamiliar part of town. Someone has been walking behind you for a few blocks. What do you do?",
      options: [
        { text: 'Take a sharp left onto a narrow side street to test them.', value: 10 },
        { text: 'Turn and confront them loudly.', value: 0 },
        { text: "Keep walking like nothing's happening.", value: 5 },
        { text: 'Cross to the other side of the street to observe.', value: 15 }
      ]
    },
    {
      id: 'q2',
      text: 'Coachella is this weekend… but your midterm is Monday at 8 AM. What do you do?',
      subtitle: '"Your baby\'s priorities — and brain power — start here."',
      options: [
        { text: 'Go to Coachella, bring my laptop, and study between sets.', value: 10 },
        { text: 'Skip the festival, stay home and study.', value: 15 },
        { text: "I'll pull an all-nighter Sunday night and hope for the best.", value: 5 },
        { text: "I forgot there was a midterm. I'm already in the desert.", value: 0 }
      ]
    },
    {
      id: 'q3',
      text: 'You reach the last page of the exam and discover… There are TWO full essays. What do you do?',
      options: [
        { text: 'Outline both essays, write clearly, and proofread before submitting.', value: 15 },
        { text: 'Skim the prompts, write what you can remember from the lecture.', value: 10 },
        { text: 'Write fast and from the heart — no outline, no edits.', value: 5 },
        { text: 'Stare at the page for 10 minutes, write one paragraph total, and hope for partial credit.', value: 0 }
      ]
    }
  ];
  
  const handleOptionSelect = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Calculate total IQ score with current answers
    const newAnswers = { ...answers, [questionId]: value };
    const answeredQuestions = Object.values(newAnswers).filter(answer => answer !== null);
    const sum = answeredQuestions.reduce((acc, curr) => acc + curr, 0);
    const iqLabel = getIQLabel(sum);
    const satScore = getSATScore(sum);
    
    updateBabyData({ 
      iqIndex: sum,
      iqLabel: iqLabel,
      satScore: satScore
    });
  };
  
  const calculateTotal = () => {
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null);
    if (answeredQuestions.length === 0) return 0;
    
    return answeredQuestions.reduce((acc, curr) => acc + curr, 0);
  };
  
  const getIQLabel = (score) => {
    if (score >= 0 && score <= 12) return 'Idiot';
    if (score >= 13 && score <= 21) return 'Imbecile';
    if (score >= 22 && score <= 30) return 'Moron';
    if (score >= 31 && score <= 39) return 'Normal';
    if (score >= 40 && score <= 45) return 'Gifted';
    return 'Undefined';
  };
  
  const getIQLabelDescription = (label) => {
    switch(label) {
      case 'Idiot': return 'Requires supervision. Exempt from academic expectations.';
      case 'Imbecile': return 'Capable of basic function. May qualify for a state program.';
      case 'Moron': return 'Socially adaptable but academically limited.';
      case 'Normal': return 'Acceptable intelligence. Track: Public University.';
      case 'Gifted': return 'Elite intellectual stock. Recommend Ivy League placement.';
      default: return '';
    }
  };
  
  const getSATScore = (score) => {
    if (score >= 0 && score <= 12) return '850 – "Remedial Track"';
    if (score >= 13 && score <= 21) return '1050 – "Vocational Prep"';
    if (score >= 22 && score <= 30) return '1250 – "College Ready"';
    if (score >= 31 && score <= 39) return '1420 – "Elite Academic Track"';
    if (score >= 40 && score <= 45) return '1600 – "Perfect Score"';
    return '';
  };
  
  const total = calculateTotal();
  const iqLabel = getIQLabel(total);
  const iqDescription = getIQLabelDescription(iqLabel);
  const satScore = getSATScore(total);
  
  return (
    <Container>
      <Title>IQ Index Assessment</Title>
      <Description>
        "Are You Street Smart or Book Smart?" This satirical assessment exposes the
        absurdity of reducing complex cognitive abilities to simplistic metrics.
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
        <h4>Current IQ Score: {total}/45</h4>
        <p style={{ fontSize: '16px', marginTop: '10px' }}>
          Classification: <strong>{iqLabel}</strong>
        </p>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          "{iqDescription}"
        </p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>
          Projected SAT Score: <strong>{satScore}</strong>
        </p>
      </ResultContainer>
    </Container>
  );
};

export default IQQuiz; 
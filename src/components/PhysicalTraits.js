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

const TraitSection = styled.div`
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const EyeColorSection = styled(TraitSection)``;

const HeightSection = styled(TraitSection)``;

const EyeColorOptions = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const EyeOption = styled.div`
  cursor: pointer;
  text-align: center;
  
  ${props => props.selected && `
    transform: scale(1.1);
  `}
  
  .eye-icon {
    width: 80px;
    height: 40px;
    border-radius: 50%;
    background: white;
    border: 2px solid #333;
    margin-bottom: 10px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      top: 5px;
      left: 25px;
      background-color: ${props => props.color};
    }
  }
  
  p {
    font-weight: ${props => props.selected ? 'bold' : 'normal'};
  }
`;

const HeightOptions = styled.div`
  margin: 20px 0;
`;

const HeightOption = styled.div`
  padding: 12px;
  margin-bottom: 10px;
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
  
  .height-label {
    font-weight: bold;
  }
  
  .height-desc {
    font-size: 14px;
    margin-top: 5px;
    color: ${props => props.selected ? 'rgba(255,255,255,0.8)' : '#666'};
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const PhysicalTraits = ({ updateBabyData }) => {
  const [eyeColor, setEyeColor] = useState('');
  const [height, setHeight] = useState('');
  
  const eyeColorOptions = [
    { value: 'brown', label: 'Brown', color: '#5D4037' },
    { value: 'blue', label: 'Blue', color: '#1E88E5' },
    { value: 'green', label: 'Green', color: '#43A047' },
    { value: 'hazel', label: 'Hazel', color: '#827717' }
  ];
  
  const heightOptions = [
    { 
      value: 'short', 
      label: 'Short (Under 5\'4")', 
      description: 'Stature may limit leadership and social dominance.'
    },
    { 
      value: 'average', 
      label: 'Average (5\'4"–5\'9")', 
      description: 'Within accepted national biological norms.'
    },
    { 
      value: 'tall', 
      label: 'Tall (5\'10"–6\'2")', 
      description: 'Desirable reproductive height for future advancement.'
    },
    { 
      value: 'very-tall', 
      label: 'Very Tall (6\'3"+)', 
      description: 'Elite phenotype: recommended for government or athletic pairing.'
    }
  ];
  
  const handleEyeColorSelect = (value) => {
    setEyeColor(value);
    updateBabyData({ eyeColor: value });
  };
  
  const handleHeightSelect = (value) => {
    setHeight(value);
    updateBabyData({ height: value });
  };
  
  const getSelectedEyeColorOption = () => {
    return eyeColorOptions.find(option => option.value === eyeColor) || {};
  };
  
  const getSelectedHeightOption = () => {
    return heightOptions.find(option => option.value === height) || {};
  };
  
  return (
    <Container>
      <Title>Physical Traits Selection</Title>
      <Description>
        Choose your baby's physical characteristics. This satirical selection process
        exposes the absurdity of assigning social value to arbitrary physical traits.
      </Description>
      
      <EyeColorSection>
        <h4>Eye Color Selection</h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Please select your ideal eye color for compatibility screening.
        </p>
        
        <EyeColorOptions>
          {eyeColorOptions.map((option) => (
            <EyeOption 
              key={option.value}
              selected={eyeColor === option.value}
              color={option.color}
              onClick={() => handleEyeColorSelect(option.value)}
            >
              <div className="eye-icon"></div>
              <p>{option.label}</p>
            </EyeOption>
          ))}
        </EyeColorOptions>
      </EyeColorSection>
      
      <HeightSection>
        <h4>Baby Height Projection</h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Select the optimal height range for your baby.
        </p>
        
        <HeightOptions>
          {heightOptions.map((option) => (
            <HeightOption 
              key={option.value}
              selected={height === option.value}
              onClick={() => handleHeightSelect(option.value)}
            >
              <div className="height-label">{option.label}</div>
              <div className="height-desc">{option.description}</div>
            </HeightOption>
          ))}
        </HeightOptions>
      </HeightSection>
      
      <ResultContainer>
        <h4>Selected Physical Traits</h4>
        {eyeColor && (
          <p style={{ marginTop: '10px' }}>
            Eye Color: <strong>{getSelectedEyeColorOption().label}</strong>
          </p>
        )}
        {height && (
          <p style={{ marginTop: '10px' }}>
            Height: <strong>{getSelectedHeightOption().label}</strong>
            <br />
            <span style={{ fontSize: '14px', color: '#666' }}>
              {getSelectedHeightOption().description}
            </span>
          </p>
        )}
      </ResultContainer>
    </Container>
  );
};

export default PhysicalTraits; 
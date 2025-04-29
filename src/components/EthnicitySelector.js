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

const SliderContainer = styled.div`
  margin: 30px 0;
`;

const Slider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
  }
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const EthnicityResult = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 18px;
  margin-top: 10px;
`;

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: #666;
  font-size: 14px;
`;

const EthnicitySelector = ({ updateBabyData }) => {
  const [value, setValue] = useState(50);
  
  // Set initial ethnicity when component mounts
  React.useEffect(() => {
    let initialEthnicity = '';
    if (value >= 1 && value <= 40) {
      initialEthnicity = 'White';
    } else if (value >= 41 && value <= 70) {
      initialEthnicity = 'Asian';
    } else {
      initialEthnicity = 'Mexican';
    }
    updateBabyData({ ethnicity: initialEthnicity });
  }, []); // Empty dependency array means this runs once on mount
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    
    let ethnicity = '';
    if (newValue >= 1 && newValue <= 40) {
      ethnicity = 'White';
    } else if (newValue >= 41 && newValue <= 70) {
      ethnicity = 'Asian';
    } else {
      ethnicity = 'Mexican';
    }
    
    updateBabyData({ ethnicity });
  };
  
  let ethnicity = '';
  if (value >= 1 && value <= 40) {
    ethnicity = 'White';
  } else if (value >= 41 && value <= 70) {
    ethnicity = 'Asian';
  } else {
    ethnicity = 'Mexican';
  }
  
  return (
    <Container>
      <Title>Genetic Heritage Selection</Title>
      <Description>
        The baby's ethnicity is determined by your input value (1–100).
        This satirical element exposes how absurd ethnic categorization can be.
      </Description>
      
      <SliderContainer>
        <Slider 
          type="range" 
          min="1" 
          max="100" 
          value={value} 
          onChange={handleChange}
        />
        <SliderLabels>
          <span>1</span>
          <span>50</span>
          <span>100</span>
        </SliderLabels>
      </SliderContainer>
      
      <ResultContainer>
        <p>Selected value: {value}</p>
        <EthnicityResult>
          Ethnicity assignment: {ethnicity}
        </EthnicityResult>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          {value >= 1 && value <= 40 
            ? "Range 1-40: 'White'" 
            : value >= 41 && value <= 70 
              ? "Range 41-70: 'Asian'" 
              : "Range 71-100: 'Mexican'"}
        </p>
      </ResultContainer>
    </Container>
  );
};

export default EthnicitySelector; 
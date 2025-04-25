import React, { useState, useEffect } from 'react';
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

const MetricSection = styled.div`
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const PartnerEducationSection = styled(MetricSection)``;

const PuritySection = styled(MetricSection)``;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const Option = styled.div`
  padding: 12px;
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
  
  .option-label {
    font-weight: bold;
  }
  
  .option-desc {
    font-size: 14px;
    margin-top: 5px;
    color: ${props => props.selected ? 'rgba(255,255,255,0.8)' : '#666'};
  }
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

const SliderLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  color: #666;
  font-size: 14px;
`;

const SliderValue = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin: 15px 0;
`;

const PurityCategory = styled.div`
  margin-top: 15px;
  font-weight: bold;
  color: ${props => props.color || '#333'};
`;

const PurityDescription = styled.p`
  margin-top: 5px;
  font-style: italic;
  color: #666;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const SocialRiskFactor = styled.div`
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${props => 
    props.risk === 'High' ? '#ffcdd2' : 
    props.risk === 'Medium' ? '#fff9c4' : 
    '#c8e6c9'};
  color: ${props => 
    props.risk === 'High' ? '#c62828' : 
    props.risk === 'Medium' ? '#f9a825' : 
    '#2e7d32'};
`;

const SocialMetrics = ({ updateBabyData }) => {
  const [partnerEducation, setPartnerEducation] = useState('');
  const [purityScore, setPurityScore] = useState(50);
  const [socialRisk, setSocialRisk] = useState('');
  
  const partnerOptions = [
    { 
      value: 'ged', 
      label: 'GED & $20K', 
      commentary: 'Limited cognitive contribution. Offspring expected to perform manual or local duties.'
    },
    { 
      value: 'bachelors', 
      label: 'Bachelor\'s Degree & $50K', 
      commentary: 'Acceptable hereditary contribution. Stable lineage with potential for vocational success.'
    },
    { 
      value: 'masters', 
      label: 'Master\'s Degree & $90K', 
      commentary: 'Elevated status. Offspring forecast: efficient, compliant, professionally adaptable.'
    },
    { 
      value: 'phd', 
      label: 'PhD & $200K+', 
      commentary: 'High-performance lineage detected. Ideal for academic reproduction and societal advancement.'
    }
  ];
  
  const getPurityCategory = (score) => {
    if (score >= 0 && score <= 25) {
      return {
        label: 'Mixed Heritage',
        description: 'Lineage deemed inconsistent. May impact genetic projection.',
        color: '#c62828'
      };
    } else if (score >= 26 && score <= 50) {
      return {
        label: 'Moderate Purity',
        description: 'Acceptable ancestry. Recommend enhanced partner screening.',
        color: '#f9a825'
      };
    } else if (score >= 51 && score <= 75) {
      return {
        label: 'High Purity',
        description: 'Favorable lineage. Approved for standard reproductive pairing.',
        color: '#2e7d32'
      };
    } else {
      return {
        label: 'Elite Purity',
        description: 'Verified ancestral consistency. Eligible for eugenic honors program.',
        color: '#1565c0'
      };
    }
  };
  
  const calculateSocialRisk = (purity, cleanliness) => {
    if (purity < 40 || cleanliness < 50) {
      return 'High';
    } else if ((purity >= 40 && purity <= 75 && cleanliness >= 50 && cleanliness <= 60) || 
               (purity >= 75 && cleanliness < 50) || 
               (purity < 40 && cleanliness >= 60)) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };
  
  const handlePartnerSelect = (value) => {
    setPartnerEducation(value);
    updateBabyData({ partnerEducation: value });
  };
  
  const handlePurityChange = (e) => {
    const newValue = parseInt(e.target.value);
    setPurityScore(newValue);
    updateBabyData({ purityScore: newValue });
  };
  
  useEffect(() => {
    // For demo purposes, we'll just use a random cleanliness value
    // In a real app, this would come from the previous components
    const mockCleanlinessIndex = 65;
    const risk = calculateSocialRisk(purityScore, mockCleanlinessIndex);
    setSocialRisk(risk);
    updateBabyData({ socialRisk: risk });
  }, [purityScore, updateBabyData]);
  
  const purityCategory = getPurityCategory(purityScore);
  const selectedPartner = partnerOptions.find(option => option.value === partnerEducation) || {};
  
  return (
    <Container>
      <Title>Social Metrics Assessment</Title>
      <Description>
        This satirical section exposes how arbitrary social metrics can be 
        used to make pseudo-scientific judgments about human worth.
      </Description>
      
      <PartnerEducationSection>
        <h4>Partner Education and Income Level</h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Select the educational and economic background of your ideal partner.
        </p>
        
        <Options>
          {partnerOptions.map((option) => (
            <Option 
              key={option.value}
              selected={partnerEducation === option.value}
              onClick={() => handlePartnerSelect(option.value)}
            >
              <div className="option-label">{option.label}</div>
              <div className="option-desc">{option.commentary}</div>
            </Option>
          ))}
        </Options>
      </PartnerEducationSection>
      
      <PuritySection>
        <h4>Ancestral Purity Score</h4>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
          Adjust the slider to select your baby's "purity" level. This satirical metric
          exposes the arbitrary and harmful nature of racial purity concepts.
        </p>
        
        <SliderValue>{purityScore}</SliderValue>
        
        <SliderContainer>
          <Slider 
            type="range" 
            min="0" 
            max="100" 
            value={purityScore} 
            onChange={handlePurityChange}
          />
          <SliderLabels>
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </SliderLabels>
        </SliderContainer>
        
        <PurityCategory color={purityCategory.color}>
          {purityCategory.label}
        </PurityCategory>
        <PurityDescription>
          "{purityCategory.description}"
        </PurityDescription>
      </PuritySection>
      
      <ResultContainer>
        <h4>Social Assessment Summary</h4>
        
        {partnerEducation && (
          <p style={{ marginTop: '10px' }}>
            Partner Education: <strong>{selectedPartner.label}</strong>
            <br />
            <span style={{ fontSize: '14px', color: '#666' }}>
              "{selectedPartner.commentary}"
            </span>
          </p>
        )}
        
        <p style={{ marginTop: '15px' }}>
          Ancestral Purity Score: <strong>{purityScore}/100</strong>
          <br />
          <span style={{ fontSize: '14px', color: '#666' }}>
            Category: {purityCategory.label}
          </span>
        </p>
        
        {socialRisk && (
          <SocialRiskFactor risk={socialRisk}>
            Social Risk Assessment: {socialRisk} Risk
            <br />
            <span style={{ fontSize: '14px', fontWeight: 'normal' }}>
              {socialRisk === 'High' 
                ? 'Subject flagged for deviant tendencies and potential disruption.' 
                : socialRisk === 'Medium' 
                  ? 'Moderate behavioral variance expected. Recommend monitoring.' 
                  : 'Approved social alignment. Minimal concern for deviation.'}
            </span>
          </SocialRiskFactor>
        )}
      </ResultContainer>
    </Container>
  );
};

export default SocialMetrics; 
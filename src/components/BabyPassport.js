import React from 'react';
import styled from 'styled-components';

const PassportContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const BabyImage = styled.img`
  position: absolute;
  top: 10px;
  left: 20px;
  width: 150px;
  height: 150px;
  border: 2px solid #1a1a2e;
  object-fit: cover;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
  background-color: white;
  padding: 5px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #1a1a2e;
  padding-bottom: 20px;
  position: relative;
  margin-left: 80px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 150px;
`;

const MainTitle = styled.h1`
  color: #1a1a2e;
  margin: 0;
  font-size: 2.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Subtitle = styled.h2`
  color: #666;
  margin: 10px 0 0 0;
  font-size: 1.2rem;
  font-style: italic;
`;

const WarningBanner = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
  border-radius: 4px;
  font-size: 14px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h3`
  color: #1a1a2e;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 15px;
`;

const Field = styled.div`
  margin: 12px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Label = styled.div`
  font-weight: 600;
  width: 150px;
  color: #555;
`;

const Value = styled.div`
  flex: 1;
  font-weight: ${props => props.highlight ? 'bold' : 'normal'};
  color: ${props => props.color || 'inherit'};
`;

const Seal = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #1a1a2e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: gold;
  font-weight: bold;
  font-size: 12px;
  border: 2px solid gold;
  transform: rotate(15deg);
  text-align: center;
  line-height: 1.2;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #ddd;
  font-size: 0.9rem;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button`
  background-color: #1a1a2e;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #2a2a4e;
  }
`;

const BabyPassport = ({ babyData }) => {
  const refreshPage = () => {
    window.location.reload();
  };
  
  const getBabyImage = (ethnicity) => {
    switch(ethnicity) {
      case 'White':
        return '/images/white_baby.png';
      case 'Asian':
        return '/images/asian_baby.png';
      case 'Mexican':
        return '/images/hispanic_baby.png';
      default:
        return '/images/white_baby.png';
    }
  };
  
  const getSocialRiskColor = (risk) => {
    switch(risk) {
      case 'High': return '#c62828';
      case 'Medium': return '#f9a825';
      case 'Low': return '#2e7d32';
      default: return 'inherit';
    }
  };
  
  const getPurityCategory = (score) => {
    if (score >= 0 && score <= 25) return 'Mixed Heritage';
    if (score >= 26 && score <= 50) return 'Moderate Purity';
    if (score >= 51 && score <= 75) return 'High Purity';
    return 'Elite Purity';
  };
  
  const getIQLabel = (score) => {
    if (score >= 0 && score <= 4) return 'Idiot';
    if (score >= 5 && score <= 7) return 'Imbecile';
    if (score >= 8 && score <= 10) return 'Moron';
    if (score >= 11 && score <= 13) return 'Normal';
    if (score >= 14 && score <= 45) return 'Gifted';
    return 'Undefined';
  };
  
  const getHeightLabel = (height) => {
    switch(height) {
      case 'short': return 'Short (Under 5\'4")';
      case 'average': return 'Average (5\'4"–5\'9")';
      case 'tall': return 'Tall (5\'10"–6\'2")';
      case 'very-tall': return 'Very Tall (6\'3"+)';
      default: return '';
    }
  };
  
  const getHeightDescription = (height) => {
    switch(height) {
      case 'short': return 'Stature may limit leadership and social dominance.';
      case 'average': return 'Within accepted national biological norms.';
      case 'tall': return 'Desirable reproductive height for future advancement.';
      case 'very-tall': return 'Elite phenotype: recommended for government or athletic pairing.';
      default: return '';
    }
  };
  
  const getPartnerEducationLabel = (education) => {
    switch(education) {
      case 'ged': return 'GED & $20K';
      case 'bachelors': return 'Bachelor\'s Degree & $50K';
      case 'masters': return 'Master\'s Degree & $90K';
      case 'phd': return 'PhD & $200K+';
      default: return '';
    }
  };
  
  const getPartnerEducationComment = (education) => {
    switch(education) {
      case 'ged': return 'Limited cognitive contribution. Offspring expected to perform manual or local duties.';
      case 'bachelors': return 'Acceptable hereditary contribution. Stable lineage with potential for vocational success.';
      case 'masters': return 'Elevated status. Offspring forecast: efficient, compliant, professionally adaptable.';
      case 'phd': return 'High-performance lineage detected. Ideal for academic reproduction and societal advancement.';
      default: return '';
    }
  };
  
  return (
    <PassportContainer>
      <BabyImage 
        src={getBabyImage(babyData.ethnicity)} 
        alt={`${babyData.ethnicity || 'Baby'} portrait`} 
      />
      <Header>
        <MainTitle>BABY PASSPORT</MainTitle>
        <Subtitle>Official Genetic Evaluation Certificate</Subtitle>
        <Seal>BUREAU OF REPRODUCTIVE STANDARDS</Seal>
      </Header>
      
      <WarningBanner>
        SATIRE: This document exposes eugenic thinking by mimicking its language and metrics
      </WarningBanner>
      
      <Section>
        <SectionTitle>Genetic Heritage</SectionTitle>
        <Field>
          <Label>Ethnicity:</Label>
          <Value highlight>{babyData.ethnicity || 'Not specified'}</Value>
        </Field>
        <Field>
          <Label>Ancestral Purity:</Label>
          <Value highlight>{babyData.purityScore}/100 ({getPurityCategory(babyData.purityScore)})</Value>
        </Field>
      </Section>
      
      <Section>
        <SectionTitle>Intellectual Capacity</SectionTitle>
        <Field>
          <Label>IQ Classification:</Label>
          <Value highlight>{getIQLabel(babyData.iqIndex)}</Value>
        </Field>
        <Field>
          <Label>SAT Projection:</Label>
          <Value>{babyData.satScore}</Value>
        </Field>
        <Field>
          <Label>Cleanliness Index:</Label>
          <Value>{babyData.cleanlinessIndex}/100</Value>
        </Field>
      </Section>
      
      <Section>
        <SectionTitle>Physical Attributes</SectionTitle>
        <Field>
          <Label>Eye Color:</Label>
          <Value>{babyData.eyeColor || 'Not specified'}</Value>
        </Field>
        <Field>
          <Label>Height Projection:</Label>
          <Value highlight>{getHeightLabel(babyData.height)}</Value>
        </Field>
        <Field>
          <Label>Height Analysis:</Label>
          <Value>{getHeightDescription(babyData.height)}</Value>
        </Field>
      </Section>
      
      <Section>
        <SectionTitle>Social Metrics</SectionTitle>
        <Field>
          <Label>Partner Education:</Label>
          <Value highlight>{getPartnerEducationLabel(babyData.partnerEducation)}</Value>
        </Field>
        <Field>
          <Label>Education Impact:</Label>
          <Value>{getPartnerEducationComment(babyData.partnerEducation)}</Value>
        </Field>
        <Field>
          <Label>Social Risk Factor:</Label>
          <Value color={getSocialRiskColor(babyData.socialRisk)} highlight>
            {babyData.socialRisk} Risk
          </Value>
        </Field>
        <Field>
          <Label>Risk Assessment:</Label>
          <Value>
            {babyData.socialRisk === 'High' 
              ? 'Subject flagged for deviant tendencies and potential disruption.' 
              : babyData.socialRisk === 'Medium' 
                ? 'Moderate behavioral variance expected. Recommend monitoring.' 
                : 'Approved social alignment. Minimal concern for deviation.'}
          </Value>
        </Field>
      </Section>
      
      <ButtonContainer>
        <Button onClick={refreshPage}>Design Another Baby</Button>
      </ButtonContainer>
    </PassportContainer>
  );
};

export default BabyPassport; 
import React, { useState } from 'react';
import styled from 'styled-components';
import EthnicitySelector from './components/EthnicitySelector';
import CleanlinessQuiz from './components/CleanlinessQuiz';
import IQQuiz from './components/IQQuiz';
import PhysicalTraits from './components/PhysicalTraits';
import SocialMetrics from './components/SocialMetrics';
import BabyPassport from './components/BabyPassport';

const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Helvetica Neue', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #1a1a2e;
  color: #fff;
  border-radius: 8px;
`;

const Section = styled.section`
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 20px 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: #4a90e2;
    border-radius: 5px;
    transition: width 0.5s ease;
  }
`;

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [babyData, setBabyData] = useState({
    ethnicity: null,
    cleanlinessIndex: 0,
    iqIndex: 0,
    satScore: 0,
    eyeColor: '',
    height: '',
    partnerEducation: '',
    purityScore: 0,
    socialRisk: '',
  });
  
  const [showPassport, setShowPassport] = useState(false);
  
  const steps = [
    { name: 'Ethnicity Selection', component: <EthnicitySelector updateBabyData={updateBabyData} /> },
    { name: 'Cleanliness Index', component: <CleanlinessQuiz updateBabyData={updateBabyData} /> },
    { name: 'IQ Index', component: <IQQuiz updateBabyData={updateBabyData} /> },
    { name: 'Physical Traits', component: <PhysicalTraits updateBabyData={updateBabyData} /> },
    { name: 'Social Metrics', component: <SocialMetrics updateBabyData={updateBabyData} /> },
  ];
  
  function updateBabyData(newData) {
    setBabyData(prevData => ({
      ...prevData,
      ...newData
    }));
  }
  
  function nextStep() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPassport(true);
    }
  }
  
  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }
  
  const progress = ((currentStep) / (steps.length)) * 100;
  
  return (
    <AppContainer>
      <Header>
        <h1>Build-A-Baby: Where Bias Meets Eugenics</h1>
        <p>A satirical simulation exposing the absurdities of eugenic thinking</p>
      </Header>
      
      {!showPassport ? (
        <>
          <ProgressBar progress={progress} />
          <Section>
            <h2>{steps[currentStep].name}</h2>
            {steps[currentStep].component}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {currentStep > 0 && (
                <button onClick={prevStep}>Previous</button>
              )}
              <button onClick={nextStep}>
                {currentStep === steps.length - 1 ? 'Generate Baby Passport' : 'Next'}
              </button>
            </div>
          </Section>
        </>
      ) : (
        <BabyPassport babyData={babyData} />
      )}
    </AppContainer>
  );
};

export default App; 
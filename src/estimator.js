const estimateCurrentlyInfected = (impact, data) => {
    const currentlyInfected = Math.trunc(data.reportedCases * impact);
    return currentlyInfected;
  };

// infectionsByrequestedTime()

const infectionsByrequestedTime = (data, currentlyInfected) => {
let time = '';
let infectionBRT = '';

// days

if (data.periodType.toLowerCase() === 'days') {
    time = Math.trunc((data.timeToElapse * 1) / 3);
}

// weeks

if (data.periodType.toLowerCase() === 'weeks') {
    time = Math.trunc((data.timeToElapse * 7) / 3);
}

// months

if (data.periodType.toLowerCase() === 'months') {
    time = Math.trunc((data.timeToElapse * 30) / 3);
}

infectionBRT = Math.trunc(currentlyInfected * (2 ** time));
return infectionBRT;

};

// Severe cases by Requested Time Function
const estSevereCasesBRT = (infectionByRT) => {
  const estSevereCasesByRT = Math.trunc(infectionByRT * (15 / 100));
    return estSevereCasesBRT;
}; 

const estimateImpact = (data, impact) => {

    // Challenge 1
    const currentlyInfectedR = Math.trunc(estimateCurrentlyInfected(impact, data));
    const infectionByRT = Math.trunc(infectionsByrequestedTime(data, currentlyInfectedR));

    // Impact object
    const impactObj = {
        currentlyInfected: currentlyInfectedR,
        infectionsByrequestedTime: infectionByRT,
        severeCasesByRequestedTime: Math.trunc(severeCasesByRequestedTime), 
    };
    return impactObj;
};

const covid19ImpactEstimator = (data) => {
    const impact = estimateImpact(data, 10);
    const severeImpact = estimateImpact(data, 50);
    const completeData = { data, impact, severeImpact };
    return completeData;
  };

export default covid19ImpactEstimator;

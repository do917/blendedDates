import shoppingModels from './shoppingModels';

export default {
  login: 'Hi there! In order for me to assist you, I will need to review your Instagram photos to see which REI gear fits best!',
  loading: (name) => {
    if (name) {
      return `Analyzing ${name}'s pictures...`;
    } else {
      return `Analyzing picture...`
    }
  },
  home: (name) => {
    return `Welcome ${name.replace(/\b\w/g, l => l.toUpperCase())}! How may I assist your shopping experience for today?`;
  },
  results: (label) => {
    if (label !== 'other') {
      return `Ah, I recommend ${shoppingModels.verbs[label]} gear!`;
    } else {
      return `Hm... I don't see anything in the photo that is related to any of REI's products...`
    }
  },
  train: () => {
    return 'Here\'s how I categorized each picture...'; 
  }
}
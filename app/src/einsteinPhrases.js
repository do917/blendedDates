import shoppingModels from './shoppingModels';

export default {
  login: 'Hi there! In order for me to assist you, I will need to review your Instagram photos to see which REI gear fits best!',
  loading: (name) => {
    if (name) {
      return `Analyzing ${name}'s photos...`;
    } else {
      return 'Analyzing photo...'
    }
  },
  home: (name) => {
    if (name === 'invalidUser') {
      return 'Sorry... it looks like I can\'t find that user on Instagram...';
    } else {
      return `Welcome ${name.replace(/\b\w/g, l => l.toUpperCase())}! How may I assist your shopping experience for today?`;
    }
  },
  results: (label) => {
    if (label !== 'other') {
      return `Ah, I recommend ${shoppingModels.verbs[label]} gear!`;
    } else {
      return 'Hm... I don\'t see anything in the photo that is related to any of REI\'s products...'
    }
  },
  train: () => {
    return 'Here\'s how I categorized each photo, click on them if you think I made a mistake...';
  },
};

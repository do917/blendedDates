import shoppingModels from './shoppingModels';

export default {
  login: 'Hi there! In order for me to assist you, I will need to review your Instagram photos to see which REI gear fits best!',
  loading: (name) => {
    return `Analyzing ${name}'s pictures...`
  },
  home: (name) => {
    return `Welcome ${name}! How may I assist your shopping experience for today?`
  },
  results: (label) => {
    return `Ah, I recommend ${shoppingModels.verbs[label]} gear!`
  },
}
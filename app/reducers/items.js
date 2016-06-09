function items(state = [], action) {
  switch(action.type) {
    case 'INCREMENT_STUFF': {
      console.log('Incrementing stuff!!');
      const i = action.index;
      console.log(`Icrement ${i} to ${i+1}`);
      return state;
      break;
    }
    default: {
      return state;
    }
  }
}

export default items;

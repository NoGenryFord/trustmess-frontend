const initialState = {
  example: {
    data: null,
    error: null,
  },
};

const updateState = (state, key, data) => {
  console.log(`Updateting state: ${state}, key: ${key}, data: ${data}`);
  initialState[state] = {
    ...initialState[state],
    [key]: data,
  };
  console.log(`Updated initialState: `, initialState);
};

let store = null;

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(`An error occured loading state`, error);

    return undefined;
  }
};

export const saveState = state => {
  // try {
  // 	const serializedState = JSON.stringify(state);
  // 	localStorage.setItem('state', serializedState);
  // } catch(error) {
  // 	console.log(`An error occured saving store state`, error);
  // }
};

export const deleteStoreState = () => {
  let store = localStorage.getItem("state");

  if (store) {
    try {
      localStorage.delete("state");
    } catch (error) {
      console.log(`An error occured deleting localStorage`);
    }
  }
};

export const setStore = newStore => {
  store = newStore;
};

export const getStore = () => {
  return store;
};

export const getStoreState = () => {
  const store = getStore();

  if (store) {
    return store.getState();
  }

  return false;
};

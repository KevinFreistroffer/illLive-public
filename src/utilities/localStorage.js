// TODO maybe do the set a 'saved' property and et it to false. Only remove localStorage items
// if it is possible for a componentDIdUnmount kind of a thing to happen

/*
 * @param name: String | The localStorage items name
 * @param content: Any | The item to store
 */
// TODO remove LocalStorage from name because it's inherit in the LocalStorage.function name
export const addToLocalStorage = (name, content) => {
  //console.log(`addToLocalStorage`);
  try {
    let serializedItem = localStorage.getItem(name);

    if (serializedItem !== null) {
      updateLocalStorage(name, content);

      // TODO how to really check if it is an object
    } else if (typeof content === "string" && content.indexOf(":") < 0) {
      localStorage.setItem(name, content);
    } else {
      localStorage.setItem(name, JSON.stringify(content));
    }
  } catch (error) {
    console.warn(`An error occured at addToLocalStorage`, error);
  }
};

export const getItem = name => {
  try {
    let serializedContent = localStorage.getItem(name);

    if (!serializedContent) {
      return null;
    } else {
      return JSON.parse(serializedContent);
    }
  } catch (error) {
    console.warn(`An error occured calling localStorage.getItem()`, error);
  }
};

export const isInLocalStorage = name => {
  try {
    let serializedContent = localStorage.getItem(name);
    return serializedContent !== null ? true : false;
  } catch (error) {
    //console.log(`An error occured calling localStorage.getItem()`, error);
  }
};

// TODO remove LocalStorage from name
export const updateLocalStorage = (name, content) => {
  try {
    let serializedContent = localStorage.getItem(name);
    if (serializedContent !== null) {
      // TODO Object.combine or whatever it is
      localStorage.removeItem(name);
      localStorage.setItem(name, JSON.stringify(content));
    } else {
      //console.log(`[Utility database] updateLocalStorage()`);
      //console.log(`item either failed to setItem() earlier or has been saved to the database`);
      return null;
    }
  } catch (error) {
    console.warn("An error occured at updateLocalStorage", error);
  }
};

// TODO remove LocalStorage from name because it's inherit in the LocalStorage.function name
/**
 *
 * @param {string[]} names
 */
export const removeFromLocalStorage = names => {
  try {
    names.forEach(name => {
      let serializedItem = localStorage.getItem(name);

      if (serializedItem) {
        localStorage.removeItem(name);
      } else {
        return undefined;
      }
    });
  } catch (error) {
    console.warn(`An error occured fetching or removing the item`, error);
  }
};

export const clearLocalStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.warn("An error occured calling localStorage.clear()", error);
  }
};

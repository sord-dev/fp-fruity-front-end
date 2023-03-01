const LocalStorage = {
  saveItem(k, v) {
    const value = JSON.stringify(v);
    console.log(`${value} saved to localstorage.`)
    return localStorage.setItem(k, value);
  },

  loadItem(k) {
    return localStorage.getItem(k);
  },

  deleteItem(k) {
    return localStorage.removeItem(k);
  }
};


module.exports = LocalStorage;
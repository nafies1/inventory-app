import { inventoryDb } from "../../config/firebase";

const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories
  };
}

export const fetchInventories = () => (dispatch) => {
  dispatch(setLoading(true))
  inventoryDb
    .get()
    .then((doc) => {
      const inventory = doc.data();
      dispatch(setInventories(doc.data()));
      const items = [];
      const categors = [];
      for (const key in inventory) {
        items.push(...inventory[key])
        categors.push(key)
      }
      dispatch(setProducts(items));
      dispatch(setCategories(categors));

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
};

export const fetchInventories = () => (dispatch) => {
  dispatch(setLoading(true))
  inventoryDb
    .get()
    .then((doc) => {
      const inventory = doc.data();
      dispatch(setInventories(doc.data()));
      const items = [];
      const categors = [];
      for (const key in inventory) {
        items.push(...inventory[key])
        categors.push(key)
      }
      dispatch(setProducts(items));
      dispatch(setCategories(categors));

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
};

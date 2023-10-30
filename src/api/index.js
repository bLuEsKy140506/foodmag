//---WORKABLE BACK-END STRUCTURE FROM PREVIOUS IPA
//---I JUST COPIED THIS, SINCE ITS WORK IS THE SAME LIKE (POSTING, ADDING, MODIFY, REMOVING)

const BASE_URL = "http://localhost:3000";

export const recipesAPI = {
  //FETCHING --------------------------
  fetchAll: () => fetch(`${BASE_URL}/recipes`).then((res) => res.json()),

  //MODIFYING -------------------------
  updateOne: async (id) => {
    const data = id;

    const options = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${BASE_URL}/recipes/${data.id}`, options);
    return await res.json();
  },

  //POSTING ---------------------------------------
  createOne: (recipe) => {
    const data = recipe;

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch(`${BASE_URL}/recipes`, options).then((res) => {
      return res.json();
    });
  },

  //REMOVING -------------------------------------
  deleteOne: async (id) => {
    const options = {
      method: "DELETE",
      body: JSON.stringify(id),
    };
    const res = await fetch(`${BASE_URL}/recipes/${id}`, options);
    return await res.json();
  },
};

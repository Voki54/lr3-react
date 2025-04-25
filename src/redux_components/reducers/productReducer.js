import { ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT } from "../actionTypes";

const initialState = {
  items: [
    {
      id: 1634567890123,
      title: "Цветные карандаши",
      description: "28 цветов",
      price: 250
    },
    {
      id: 1634567890124,
      title: "Ластик",
      description: "Обычный ластик",
      price: 30
    },
    {
      id: 1634567890125,
      title: "Ручка",
      description: "Синяя",
      price: 35
    }
  ],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case REMOVE_PRODUCT:
      return {
        ...state,
        items: state.items.filter(p => p.id !== action.payload),
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        items: state.items.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    default:
      return state;
  }
};

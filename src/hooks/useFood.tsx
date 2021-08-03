import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { FoodType } from '../types';

interface FoodProviderProps{ //Context Provider
  children: ReactNode;
}

interface FoodContextData{ //main data type which will be manipulated and function types
  foods: FoodType[];
  addFood: ({id, name, description, price, available, image} : FoodType) => Promise<void>;
  updateFood: (food: FoodType, editingFood: FoodType ) => Promise<void>;
  deleteFood: (foodId: number) => Promise<void>;
}

const FoodContext = createContext<FoodContextData>({} as FoodContextData);

export function FoodProvider({children}: FoodProviderProps){

  const [foods, setFoods] = useState<FoodType[]>([]);

  useEffect(()=>{
    api.get<FoodType[]>('foods')
    .then( response => setFoods(response.data));
  },[])

  const addFood = async (food:FoodType) => {
    try {

      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      const updatedFoods = [...foods];
      updatedFoods.push(response.data);
      setFoods(updatedFoods);

    } catch (err) { //catch and display on console in case of error in the server
      console.log(err);
    }

  }

  const updateFood = async (food:FoodType, editingFood:FoodType) => {
    
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );
      
      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      
      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  }

  const deleteFood = async (foodId:number) =>{
  
    const id = foodId;
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);

  }


  return (
    <FoodContext.Provider value={{foods, addFood, updateFood, deleteFood}}>
      {children}
    </FoodContext.Provider>
  );

}

export function useFood(): FoodContextData {
  const context = useContext(FoodContext);
  return context;
}

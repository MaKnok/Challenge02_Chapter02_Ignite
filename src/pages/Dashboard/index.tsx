import {useState} from 'react';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { useFood } from '../../hooks/useFood';
import { FoodsContainer } from './styles';

import { FoodType } from '../../types';

const Dashboard = (): JSX.Element => {

  const selectedFood ={
    id:0, 
    name:'nome', 
    description:'descrição', 
    price:'0.00', 
    available:true, 
    image:'imagem'
  } 
  
  const [isNewFoodModalOpen,setNewFoodModalOpen] = useState(false);
  const [editModalOpen,setEditModalOpen] = useState(false);
  const [editingFood,setEditingFood] = useState<FoodType>(selectedFood);
  const {foods, addFood, updateFood, deleteFood} = useFood();

  //adding food
  function handleAddFood(food:FoodType){
    addFood(food)
  }

  //update food
  function handleUpdateFood(food:FoodType, editingFood:FoodType){
    updateFood(food,editingFood)
  }

  function handleDeleteFood(foodId:number){
    deleteFood(foodId)
  }

  function handleToggleNewFoodModal() {
    setNewFoodModalOpen(!isNewFoodModalOpen);
  }

  //open and close edit modal 
  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food:FoodType) {
    setEditingFood(food)
    setEditModalOpen(true);
  }

  return (
    <>
      <Header onOpenNewFoodModal={handleToggleNewFoodModal} />

      <ModalAddFood
        isOpen={isNewFoodModalOpen}
        setIsOpen={handleToggleNewFoodModal}
        handleAddFood={handleAddFood}
      />

      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );

};

export default Dashboard;



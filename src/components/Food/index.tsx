import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { FoodType } from '../../types';
import api from '../../services/api';

import { Container } from './styles';

interface foodProps{
  food: FoodType;
  handleEditFood: (food: FoodType) => void;
  handleDelete: (foodId: number) => void;
}

const Food = ({food, handleEditFood, handleDelete}:foodProps): JSX.Element => {

  const available  = food.available

  const [isAvailable,setIsAvailable] = useState(available);

  const toggleAvailable = async () => {
    const id = food.id;

    await api.put(`/foods/${id}`, {
      ...food,
      available: !isAvailable
    });

    setIsAvailable(!isAvailable);
  }

  function setEditingFood(food:FoodType) {
   handleEditFood(food);
  }

  function setDeleteFoodId(foodId:number){
    handleDelete(foodId)
  }


  return (
      <Container available={isAvailable}>
        <header>
          <img src={food.image} alt={food.name} />
        </header>
        <section className="body">
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <p className="price">
            R$ <b>{food.price}</b>
          </p>
        </section>
        <section className="footer">
          <div className="icon-container">
            <button
              type="button"
              className="icon"
              onClick={()=>setEditingFood(food)}
              data-testid={`edit-food-${food.id}`}
            >
              <FiEdit3 size={20} />
            </button>

            <button
              type="button"
              className="icon"
              onClick={() => setDeleteFoodId(food.id)}
              data-testid={`remove-food-${food.id}`}
            >
              <FiTrash size={20} />
            </button>
          </div>

          <div className="availability-container">
            <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

            <label htmlFor={`available-switch-${food.id}`} className="switch">
              <input
                id={`available-switch-${food.id}`}
                type="checkbox"
                checked={isAvailable}
                onChange={toggleAvailable}
                data-testid={`change-status-food-${food.id}`}
              />
              <span className="slider" />
            </label>
          </div>
        </section>
      </Container>
  );
}


export default Food;

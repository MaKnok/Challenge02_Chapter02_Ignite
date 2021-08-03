import { FiPlusSquare } from 'react-icons/fi';
import { Container } from './styles';
import Logo from '../../assets/logo.svg';

interface HeaderProps{
  onOpenNewFoodModal: () => void; 
}

const Header = ({onOpenNewFoodModal}:HeaderProps) : JSX.Element => {


    return (
      <Container>
        <header>
          <img src={Logo} alt="GoRestaurant" />
          <nav>
            <div>
              <button
                type="button"
                onClick={onOpenNewFoodModal}
              >
                <div className="text">Novo Prato</div>
                <div className="icon">
                  <FiPlusSquare size={24} />
                </div>
              </button>
            </div>
          </nav>
        </header>

      </Container>
    )
}


export default Header;

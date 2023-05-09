import LoginSign from '../../components/LoginSign/LoginSign';
import './home.css';
import { loginContext } from '../../context/ContextProvider';
import { useContext } from 'react';
import DisplayMovies from '../../components/DisplayMovies/DisplayMovies';


function Home() {

  const {loginStatus} = useContext(loginContext)
  console.log(process.env)
  

  return (
    <div className="home__conteiner">
      {!loginStatus ?
      <LoginSign/> :
      <DisplayMovies/>
      }
    </div>
  );
}

export default Home;

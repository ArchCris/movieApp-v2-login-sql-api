import LoginSign from '../../components/LoginSign/LoginSign';
import './home.css';
import { loginContext } from '../../context/ContextProvider';
import { useContext, useEffect } from 'react';


function Home() {

  const {loginStatus} = useContext(loginContext)

  useEffect(() => {
  }, []);

  return (
    <div className="home__conteiner">
      {!loginStatus ?
      <LoginSign/> :
      null
      }
    </div>
  );
}

export default Home;

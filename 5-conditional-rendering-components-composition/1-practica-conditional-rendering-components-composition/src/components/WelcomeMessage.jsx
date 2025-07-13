

export const WelcomeMessage = ({ isLoggedIn }) => {
  return(
  <>
  {/* <h1>{isLoggedIn ? "Bienvenido de nuevo!"
  :"Por favor, inicia sesion."}</h1> */}

  {isLoggedIn &&  <h1>Bienvenido de nuevo!</h1>}
  </>
  )
};

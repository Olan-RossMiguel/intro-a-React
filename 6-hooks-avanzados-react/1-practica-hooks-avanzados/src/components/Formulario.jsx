import { useReducer } from 'react';

const initialState = { nombre: '', email: '' };

function formReducer(state, action) {

  return { ...state, [action.field]: action.value };

}

export function Formulario() {

  const [state, dispatch] = useReducer(formReducer, initialState);

  return (

    <form>

      <input

        type="text"

        value={state.nombre}

        onChange={(e) => dispatch({ field: 'nombre', value: e.target.value })}

        placeholder="Nombre"

      />

      <input

        type="email"

        value={state.email}

        onChange={(e) => dispatch({ field: 'email', value: e.target.value })}

        placeholder="Email"

      />

      <p>Nombre: {state.nombre}</p>

      <p>Email: {state.email}</p>

    </form>

  );

}

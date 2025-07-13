export function TarjetaUsuario(props) {
    return (
      <div style={{ 
    border: '1px solid #ccc', 
    padding: '10px',
    margin: '10px' }}>
        <h2>{props.nombre}</h2>
        <p>Edad: {props.edad}</p>
        <p>Ocupación: {props.ocupacion}</p>
      </div>
    );
  }
  

export function StatusMessage({ status }) {

    switch (status) {
  
      case "loading":
  
        return <p>Cargando...</p>;
  
      case "success":
  
        return <p>Datos cargados con éxito!</p>;
  
      case "error":
  
        return <p>Hubo un error al cargar los datos.</p>;
  
      default:
  
        return <p>Estado desconocido.</p>;
  
    }
  
  }
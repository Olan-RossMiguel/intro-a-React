import Button from '@mui/material/Button';
function Modal({ title, content }) {

    return (
  
      <div style={{ border: '1px solid gray', padding: '20px', backgroundColor: 'lightgray' }}>
  
        <h2>{title}</h2>
  
        <p>{content}</p>
        <Button variant="outlined">Outlined</Button>
  
      </div>
  
    );
  
  }
  
  function App() {
  
    return <Modal title="Aviso" content="Este es un mensaje importante." />;
    
  
  }
  
  export default App;
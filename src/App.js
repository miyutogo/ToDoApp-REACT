import react, {useState, useEffect} from 'react';
import List from './List';
import Alert from './Alert';
import './App.css';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import { Box, ThemeProvider, createTheme, spacing } from '@mui/system';


const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App({type}) {
  
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    msg:'',
    type:''
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    bgcolor: '	#b3cde0'
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the value is empty
    if(!name){
      // Alert display
      showAlert(true,'Enter a Task','red')
      handleOpen()
    }
    // check if there is a value 
    else if (name && editing) {
      // edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setEditing(false);
      showAlert(true, 'Task updated','green');
      handleOpen()
    }
    else{
      // show alert
      showAlert(true,'Task added','green')
      const newItem = { id: new Date().getTime().toString(), title:name};


      setList([...list, newItem]);
      setName('');
      handleOpen()
    }
  }

  const showAlert = (show=false, msg='', type='') => {
    setAlert({show,msg,type})
  }

  const clearList = () => {
    showAlert(true, 'Task list is now empty','red')
    setList([]);
    handleOpen()
  }

  const removeItem = (id) => {
    showAlert(true, 'Task completed','red');
    setList(list.filter((item) => item.id !== id));
    handleOpen()
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);


 


  return (
    <div>
          
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Box sx={style}  className={`alert alert-${type}`} >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
          >
            
            <Typography id="modal-modal-description" sx={{
                minWidth: '200px',
              }}>
              {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
            </Typography>
          </Grid>
        </Box>
      </Modal>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >    

        {/*  Header */}
        <Grid 
        xs={12}  
        lg={12}
        alignItems='center'
        >
            <Typography variant="h3" component="div" gutterBottom>To Do List </Typography>
        </Grid>

        {/*  Form */}
        <Grid 
        xs={12}  
        lg={12}>
           <FormControl >
            <Grid 
              container
              spacing={0}
              direction="row"
              alignItems="center"	
            >
              <Grid xs={6} lg={8}>
                <InputLabel htmlFor="my-input">Enter a Task</InputLabel>
                <Input 
                    id="my-input" 
                    aria-describedby="my-helper-text" 
                    value={name} 
                    onChange={(e)=> setName(e.target.value)} 
                    onSubmit={handleSubmit}
                    px={5}
                />
              </Grid>
              <Grid xs={1} lg={2}/>
              <Grid xs={2} lg={2}>
                <Button variant="contained" onClick={handleSubmit} >
                  {editing? 'edit' : 'submit'}
                </Button>
              </Grid>
            </Grid>
           </FormControl>
        </Grid>

         <Grid 
            xs={12}  
            lg={12} 
            spacing={0}
          >
            {list.length > 0 && (
                <Box 
                  border={1} 
                  width={375}
                  mt={1.5}
 
                >
                  <List items={list} removeItem={removeItem} editItem={editItem}/>
                  <center><Button className='btn btn-primary' onClick={clearList}>
                    clear items
                  </Button></center>
                </Box >
            )
            }
         </Grid>

          
        

      </Grid>
    </div>
  );
}

export default App;

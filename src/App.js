import react, {useState, useEffect} from 'react';
import List from './List';
import Alert from './Alert';
import './App.css';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [editing, setEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg:'',
    type:''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // check if the value is empty
    if(!name){
      // Alert display
      showAlert(true,'Enter an item','danger')
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
      showAlert(true, 'Item updated','success');
    }
    else{
      // show alert
      showAlert(true,'Item added','success')
      const newItem = { id: new Date().getTime().toString(), title:name};


      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show=false, msg='', type='') => {
    setAlert({show,msg,type})
  }

  const clearList = () => {
    showAlert(true, 'Empty List','danger')
    setList([]);
  }

  const removeItem = (id) => {
    showAlert(true, 'Item removed','danger');
    setList(list.filter((item) => item.id !== id));
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
    <section className='container-fluid'>
      <form className='toDoForm' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}

        <h3>To Do List </h3>
        <div className='form-control'>
          <input  
              type='text' 
              className='toDo' 
              placeholder='e.g. write an email' 
              value={name} 
              onChange={(e)=> setName(e.target.value)}
          />

          <button className='submit-btn'>
            {editing? 'edit' : 'submit'}
          </button>
        </div>

      </form>
      {list.length > 0 && (
        <div className='toDoContainer'>
            <List items={list} removeItem={removeItem} editItem={editItem}/>
            <button className='btn btn-primary' onClick={clearList}>
              clear items
            </button>
        </div>
      )
      }
    </section >

  );
}

export default App;

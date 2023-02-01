import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputText, setInputText] = useState('e.g. Eggs');
  const [itemList, setItemList] = useState([]);
  const [editBtnFlag, setEditBtnFlag] = useState(false);
  const [editItemId, setEditItemId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setItemList((itemList) => {
      if (editBtnFlag) {
        setEditBtnFlag(false);
        return [
          ...itemList.filter((item) => item.id !== editItemId),
          { id: editItemId, value: inputText },
        ];
      }
      return [...itemList, { id: uuidv4(), value: inputText }];
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h3>My List</h3>
        <form>
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {editBtnFlag ? 'Edit' : 'Submit'}
          </button>
        </form>
        {itemList?.map((item) => {
          return (
            <ListItem
              item={item}
              setItemList={setItemList}
              setInputText={setInputText}
              setEditBtnFlag={setEditBtnFlag}
              setEditItemId={setEditItemId}
              key={item.id}
            />
          );
        })}
      </header>
    </div>
  );
}

function ListItem(props) {
  const { value, id } = props.item;
  const handleDelete = () => {
    props.setItemList((itemList) => {
      return itemList.filter((item) => item.id !== id);
    });
  };

  const handleEdit = () => {
    props.setInputText(value);
    props.setEditBtnFlag(true);
    props.setEditItemId(id);
  };

  return (
    <>
      <h3>{value}</h3>
      <button className="edit" onClick={handleEdit}>
        Edit
      </button>
      <button className="remove" onClick={handleDelete}>
        Remove
      </button>
    </>
  );
}

export default App;

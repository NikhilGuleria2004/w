import {useState} from 'react';

export default function Todo(){
    const [task, setTask] = useState("");
    const [todo, setTodo] = useState([]);

    const addTask=()=>{
        if(task.trim()==='') return;

        const newTodo = {
            id: Date.now(),
            text:  task,
            completed: false,
        }

        setTodo([...todo, newTodo]);
        setTask("");
    }

    const deleteTask=(id)=>{
        setTodo(todo.filter((todo)=> todo.id !== id));
    }

    const toggleToDo = (id) =>{
        setTodo(
            todo.map((todo)=>
                todo.id === id
                ? {...todo, completed: !todo.completed}
                :todo
            )
        );
    };


  return (
    <div style={styles.container}>
      <h1>Todo App</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
      </div>

      <ul style={styles.list}>
        {todo.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span
              onClick={() => toggleToDo(todo.id)}
              style={{
                ...styles.todoText,
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTask(todo.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

    


    
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontFamily: "Arial",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  addButton: {
    padding: "10px 15px",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "20px",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  todoText: {
    cursor: "pointer",
  },
  deleteButton: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};
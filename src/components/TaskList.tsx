import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // if task title is not set, return
    if (!newTaskTitle) {
      return;
    }
    // create a new task and add to the task list
    setTasks([...tasks, {
      id: Math.floor(Math.random() * 100),
      title: newTaskTitle,
      isComplete: false
    }]);
    // clear the task title
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // map the tasks array with the task checked or unchecked
    setTasks(tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task));
  }

  function handleRemoveTask(id: number) {
    // remove a task by filtering the existing tasks
    setTasks(tasks.filter((task) => {
      return task.id !== id;
    }));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}
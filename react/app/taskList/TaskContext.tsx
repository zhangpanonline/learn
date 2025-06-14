import { createContext, useReducer, useContext } from 'react'


const TaskContext = createContext(null)
const TaskDispatchContext = createContext(null)

export const useTasks = () => useContext(TaskContext)
export const useTasksDispatch = () => useContext(TaskDispatchContext)

export function TasksProvider({ children }) {
    const [ tasks, dispatch ] = useReducer(tasksReducer, initialTasks)
    return (
        <TaskContext value={tasks}>
            <TaskDispatchContext value={dispatch}>
                { children }
            </TaskDispatchContext>
        </TaskContext>
    )
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
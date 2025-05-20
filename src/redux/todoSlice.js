import { createSlice, nanoid } from '@reduxjs/toolkit';
import { format, parseISO } from 'date-fns';

// Sample initial data
const initialState = {
  todos: [
    {
      id: "728ed52f0",
      title: "Task1",
      description: "This is the description for task 1",
      status: "Pending",
      category: "LUNCH",
      dueDate: "2025-02-27",
    },
    {
      id: "728ed52f1",
      title: "Task2",
      description: "Prepare slides for the project meeting.",
      status: "Pending",
      category: "WORK",
      dueDate: "2025-02-28",
    },
    {
      id: "728ed52f2",
      title: "Task3",
      description: "Buy groceries for the week.",
      status: "Completed",
      category: "SHOPPING",
      dueDate: "2025-03-01",
    },
    {
      id: "728ed52f3",
      title: "Task4",
      description: "Call the plumber to fix the kitchen sink.",
      status: "Pending",
      category: "HOME",
      dueDate: "2025-03-02",
    },
    {
      id: "728ed52f4",
      title: "Task5",
      description: "Read 50 pages of the new book.",
      status: "Pending",
      category: "PERSONAL",
      dueDate: "2025-03-03",
    },
    {
      id: "728ed52f5",
      title: "Task6",
      description: "Submit the tax documents online.",
      status: "Pending",
      category: "FINANCE",
      dueDate: "2025-03-04",
    },
    {
      id: "728ed52f6",
      title: "Task7",
      description: "Go for a 5km run in the morning.",
      status: "Completed",
      category: "HEALTH",
      dueDate: "2025-03-05",
    },
    {
      id: "728ed52f7",
      title: "Task8",
      description: "Organize the photo album.",
      status: "Pending",
      category: "HOBBY",
      dueDate: "2025-03-06",
    },
    {
      id: "728ed52f8",
      title: "Task9",
      description: "Clean the garage.",
      status: "Pending",
      category: "HOME",
      dueDate: "2025-03-07",
    },
    {
      id: "728ed52f9",
      title: "Task10",
      description: "Schedule annual health checkup.",
      status: "Pending",
      category: "HEALTH",
      dueDate: "2025-03-08",
    },
    {
      id: "728ed52f10",
      title: "Task11",
      description: "Plan weekend trip itinerary.",
      status: "Pending",
      category: "TRAVEL",
      dueDate: "2025-03-09",
    },
  ]
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: {
      reducer: (state, action) => {
        state.todos.push(action.payload);
      },
      prepare: (todo) => {
        // Ensure the date is in proper ISO format
        return {
          payload: {
            id: nanoid(),
            title: todo.title,
            description: todo.description,
            status: 'Pending',
            category: todo.category.toUpperCase(),
            dueDate: todo.dueDate,
          }
        };
      }
    },

    // Delete a todo
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },

    // Mark a todo as complete
    completeTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = 'Completed';
      }
    },

    // Mark a todo as pending
    markAsPending: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = 'Pending';
      }
    },

    // Update a todo
    updateTodo: (state, action) => {
      const { id, ...updates } = action.payload;
      const todo = state.todos.find(todo => todo.id === id);
      if (todo) {
        Object.assign(todo, updates);
      }
    }
  }
});

// Export actions
export const {
  addTodo,
  deleteTodo,
  completeTodo,
  markAsPending,
  updateTodo
} = todoSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.todos;
export const selectPendingTodos = (state) => state.todos.todos.filter(todo => todo.status === 'Pending');
export const selectCompletedTodos = (state) => state.todos.todos.filter(todo => todo.status === 'Completed');
export const selectOverdueTodos = (state) => {
  const today = new Date();
  return state.todos.todos.filter(todo => {
    if (!todo.dueDate) return false;
    const dueDate = parseISO(todo.dueDate);
    return dueDate < today && todo.status === 'Pending';
  });
};

export default todoSlice.reducer;

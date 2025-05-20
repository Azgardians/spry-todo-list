// import React from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import TodoList from './components/TodoList'

function App() {

  return (
    <Provider store={store}>
      <div className="w-full h-full flex items-center justify-center">
        <TodoList />
      </div>
    </Provider>

    //  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-3xl font-bold">
    //   Tailwind is working 🎉
    // </div>
  )
}

export default App

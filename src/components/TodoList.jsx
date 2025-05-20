import Board from './Board'
import { Toaster } from "@/components/ui/sonner"


function TodoList() {
  return (
    <div className="w-full max-w-5xl rounded shadow sm:shadow-none p-10">
      <Board />
      <Toaster />
    </div>
  )
}

export default TodoList


/*
  This is a simple TodoList component that will be used to display a list of todos.
  This will have
  - Filter Component for todos
  - Modal For adding todos
  - Action Button For adding todos
  - List of Todos
*/

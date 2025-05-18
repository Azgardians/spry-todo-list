import Board from './Board'
import { Button } from "@/components/ui/button"

function TodoList() {
  return (
    <div className="w-full max-w-5xl rounded shadow sm:shadow-none p-10">
      <Board />
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

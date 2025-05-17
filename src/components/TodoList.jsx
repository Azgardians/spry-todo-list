import List from './List'
import { Button } from "@/components/ui/button"

function TodoList() {
  return (
    <>
      <h2 class="text-3xl font-bold underline">TodoList</h2>
      <List />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>

    </>
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

import { Button } from './ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux';
import { toast } from 'sonner';


function Summary({ total, completed, overdue }) {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: ""
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    // Validate the form
    if (!newTask.title || !newTask.description || !newTask.category || !newTask.dueDate) {
      toast("Error in validation")
      return;
    }

    // Format the date to ensure consistent ISO format
    const formattedTask = {
      ...newTask,
      dueDate: newTask.dueDate // Already in YYYY-MM-DD format from input
    };

    // Dispatch the addTodo action
    dispatch(addTodo(formattedTask));
    setError('');
    // Reset the form
    setNewTask({
      title: "",
      description: "",
      category: "",
      dueDate: ""
    });
  };
  return (
    <div className="flex flex-row justify-between items-center p-4 gap-4">
      <span className="text-xs text-black font-normal">
        There are {total} tasks of which you have completed { completed } tasks.
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-red-500 font-normal">
          {overdue}
        </span>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="white">Add Task</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Task</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4 px-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newTask.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={newTask.category}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duedate" className="text-right">
                Due
              </Label>
              <Input
                id="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                type="date"
                className="col-span-3"
              />
            </div>
            <div className="flex">
              <span className="text-xs text-red-500 my-2"> { error }</span>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleSave}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* <Button
        size={"sm"}
        variant={"white"}
      >
        Add Task
      </Button> */}
    </div>
  )
}

export default Summary

/*


export function SheetDemo() {
  return (

  )
}

*/

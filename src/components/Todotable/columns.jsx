import { Button } from "@/components/ui/button"
import { Check, Trash2, ArrowUpIcon, ArrowDownIcon, EditIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { format, parseISO } from 'date-fns';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux";
import { deleteTodo, completeTodo, updateTodo } from "../../redux/todoSlice";
import { toast } from "sonner";
import { useState } from 'react';
// import { ConfettiBurst } from "../confettiBurst";


function ActionsCell({ row }) {
  const dispatch = useDispatch();
  // const [showConfetti, setShowConfetti] = useState(false);
  const [newTask, setNewTask] = useState({
    id: row.original.id,
    title: row.original.title,
    description: row.original.description,
    category: row.original.category,
    dueDate: row.original.dueDate
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEdit = () => {
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

    // Dispatch the updateTodo action
    dispatch(updateTodo(formattedTask));
  };

  const handleDelete = (row) => {
    dispatch(deleteTodo(row.id));
    toast(row.title + " item deleted");
  };

  const handleComplete = (row) => {
    dispatch(completeTodo(row.id));
    toast(row.title + " item completed");
    // setShowConfetti(true);
    // setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <div className="flex flex-row gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="p-1 rounded hover:bg-green-100"
            title="Mark as Complete"
          >
            <EditIcon className="w-4 h-4 text-black" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
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
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleEdit}>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <button
        className="p-1 rounded hover:bg-red-100"
        onClick={() => handleDelete(row.original)}
        title="Delete"
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
      <button
        className="p-1 rounded hover:bg-green-100"
        onClick={() => handleComplete(row.original)}
        title="Mark as Complete"
      >
        <Check className="w-4 h-4 text-green-600" />
      </button>
      {/* {showConfetti && (
        <div className="absolute left-1/2 top-0 z-50">
          <ConfettiBurst />
        </div>
      )} */}
    </div>
  );
}

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.getValue("description");
      // const showTooltip = desc.length > 20;
      return (
        <span className="text-xs text-black font-normal">{desc}</span>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: 'dueDate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >
          Due Date
          {column.getIsSorted() === "asc" && <ArrowUpIcon />}
          {column.getIsSorted() === "desc" && <ArrowDownIcon />}
        </Button>
      )
    },
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId);
      const b = rowB.getValue(columnId);
      const aTime = a ? parseISO(a).getTime() : 0;
      const bTime = b ? parseISO(b).getTime() : 0;
      return aTime - bTime;
    },
    cell: ({ row }) => {
      const dueDate = row.getValue("dueDate");
      if (!dueDate) return ""
      const dateObj = format(parseISO(dueDate), "dd MMM yyyy");
      return (
        <span className="text-xs text-black font-normal">{dateObj}</span>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />
  },
]

export const completedColumns = columns.filter(item => item.id !== "actions");

/*
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

if (showTooltip) {
  return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-xs text-black font-normal">
            {desc.substring(0, 20)}...
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
  )
}
*/

import { Button } from "@/components/ui/button"
import { Check, Trash2, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { format, parseISO } from 'date-fns';


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
    cell: ({ row, handleActions }) => {

      return (
        <div className="flex flex-row gap-2">
          <button
            className="p-1 rounded hover:bg-red-100"
            onClick={() => handleActions('DELETE', row.original.id)}
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
          <button
            className="p-1 rounded hover:bg-green-100"
            onClick={() => handleActions('COMPLETE', row.original.id)}
            title="Mark as Complete"
          >
            <Check className="w-4 h-4 text-green-600" />
          </button>
        </div>
      )
    },
  },
]

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

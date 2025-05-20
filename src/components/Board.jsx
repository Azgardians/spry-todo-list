import { columns, completedColumns } from "./Todotable/columns"

import {
  Card,
} from "@/components/ui/card"
import { DataTable } from "./Todotable/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
import Summary from "./Summary"
import { useSelector } from "react-redux"
import {
  selectAllTodos,
  selectPendingTodos,
  selectCompletedTodos,
  selectOverdueTodos
} from "../redux"




function Board() {
  // const data = getData()
  // const completedData = getCompletedData();
  const todos = useSelector(selectPendingTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const allTodos = useSelector(selectAllTodos);
  const overdueTodos = useSelector(selectOverdueTodos);

  const overdueMessage = overdueTodos.length > 0
  ? `${overdueTodos.length} task${overdueTodos.length > 1 ? 's are' : ' is'} overdue`
  : "No overdue tasks";

  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-4">
        <Tabs defaultValue="todo" className="w-[450px] md:w-[600px] lg:w-[800px] xl:w-[1000px]">
          <TabsList className="grid w-full grid-cols-2 gap-x-4 mb-3">
            <TabsTrigger value="todo">Todo</TabsTrigger>
            <TabsTrigger value="complete">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="todo" className="min-h-tabs">
            <Card>
              <div className="flex flex-col">
                <Summary completed={completedTodos.length} total={allTodos.length} overdue={overdueMessage} />
                <DataTable columns={columns} data={todos} />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="complete" className="min-h-tabs">
            <Card>
              <DataTable columns={completedColumns} data={completedTodos} completed={ true } />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Board

/*
  import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function getData() {
  return [
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
}


function getCompletedData () {
  return [
    {
      id: "728ed52f0",
      title: "Task1",
      description: "This is the description for task 1",
      status: "Completed",
      category: "LUNCH",
      dueDate: "2025-02-27",
    },
    {
      id: "728ed52f1",
      title: "Task2",
      description: "Prepare slides for the project meeting.",
      status: "Completed",
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
      id: "728ed52f6",
      title: "Task7",
      description: "Go for a 5km run in the morning.",
      status: "Completed",
      category: "HEALTH",
      dueDate: "2025-03-05",
    },
  ]
}
*/

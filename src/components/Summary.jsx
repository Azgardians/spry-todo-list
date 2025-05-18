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

function Summary({ total, completed }) {
  return (
    <div className="flex flex-row justify-between p-4 gap-4">
      <span className="text-xs text-black font-normal">
        There are {total} tasks of which you have completed { completed } tasks.
      </span>
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
                  <Input id="title" value="" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input id="description" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Input id="category" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duedate" className="text-right">
                    Due
                  </Label>
                  <Input id="duedate" className="col-span-3" />
                </div>

              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
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

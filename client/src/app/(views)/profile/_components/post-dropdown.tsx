import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pen, Trash } from "lucide-react";

interface PostDropdownProps {
  handleEditPost: () => void;
  handleDeletePost: () => void;
}

export function PostDropdown({
  handleEditPost,
  handleDeletePost,
}: PostDropdownProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="xs"
          className="rounded-full"
          variant={"ghost"}
        >
          <EllipsisVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Post settings</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleEditPost}>
            Edit
            <DropdownMenuShortcut>
              <Pen />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeletePost}>
            Delete
            <DropdownMenuShortcut>
              <Trash />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

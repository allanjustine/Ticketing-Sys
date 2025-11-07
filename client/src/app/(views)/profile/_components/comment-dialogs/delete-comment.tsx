import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import ButtonLoader from "@/components/ui/button-loader";
import { api } from "@/lib/api";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface DeleteCommentProps {
  id: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  setIsRefreshComment: Dispatch<SetStateAction<boolean>>;
}

export function DeleteComment({
  id,
  open,
  setOpen,
  setIsRefresh,
  setIsRefreshComment,
}: DeleteCommentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDeleteComment = async () => {
    setIsRefresh(true);
    setIsRefreshComment(true);
    setIsLoading(true);
    try {
      const response = await api.delete(`/comments/${id}/delete`);

      if (response.status === 200) {
        toast.success("Success", {
          description: response.data.message,
          position: "bottom-center",
        });
        setOpen(false);
        setError("");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 429) {
        setError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
      setIsRefresh(false);
      setIsRefreshComment(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            comment to this post.
          </AlertDialogDescription>
          {error && (
            <AlertDialogDescription className="text-red-500 text-xs text-center">
              {error}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <ButtonLoader
            type="button"
            onClick={handleDeleteComment}
            isLoading={isLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            Yes, Delete
          </ButtonLoader>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

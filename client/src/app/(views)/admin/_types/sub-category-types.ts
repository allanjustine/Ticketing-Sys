import { Dispatch, SetStateAction } from "react";

export interface SubCategoryFormDataType {
  sub_category_name: string;
}

export interface SubCategoryDataType {
  id: number;
  ticket_category_id: number;
  sub_category_name: string;
}

export interface EditSubCategoryProps {
  data: SubCategoryDataType;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
}

export interface DeleteSubCategoryProps {
  data: SubCategoryDataType;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
}

export interface AddSubCategoryProps {
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  ticketCategoryId: string | number;
}

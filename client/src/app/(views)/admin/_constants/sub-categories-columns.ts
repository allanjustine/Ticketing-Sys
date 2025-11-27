export const SUB_CATEGORIES_COLUMNS = [
  {
    name: "ID",
    cell: (row: any) => row?.id,
    sortable: false,
  },
  {
    name: "Sub Category Name",
    cell: (row: any) => row?.sub_category_name,
    sortable: false,
  },
];

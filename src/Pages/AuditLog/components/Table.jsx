import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        header: "Action",
        accessorKey: "action",
      },
      {
        header: "User",
        accessorKey: "user_name",
      },
      {
        header: "Date",
        accessorKey: "created_at",
      },
    ],
    []
  );

  return <MaterialReactTable columns={columns} data={data} />;
};

export default Table;

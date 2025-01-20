import { useState, useMemo } from "react";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import useAuth from "../../../hook/useAuth";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const MyAddedPet = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: myPet = [], refetch } = useQuery({
    queryKey: ["myPet", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-pet/${user?.email}`);
      return data;
    },
  });

  const columns = useMemo(
    () => [
      {
        header: "Serial No",
        accessorKey: "serial",
        cell: (info) => info.row.index + 1,
      },
      {
        header: "Image",
        accessorKey: "image",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="pet"
            className="w-12 h-12 rounded-full"
          />
        ),
      },
      {
        header: "Pet Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        header: "Category",
        accessorKey: "category",
        enableSorting: true,
      },
      {
        header: "Adopted",
        accessorKey: "adopted",
        enableSorting: true,
        cell: (info) => (
          <span
            className={
              info.getValue() === "true" ? "text-black" : "text-red-500"
            }
          >
            {info.getValue() === "true" ? "Adopted" : "Not Adopted"}
          </span>
        ),
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (info) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/dashboard/my-added-pet/${info.row.original._id}`)
              }
              className="text-[#F69585] px-2 py-1 text-lg rounded"
            >
              <FaEdit></FaEdit>
            </button>
            <button
              onClick={() => handleDelete(info.row.original._id)}
              className="text-[#F69585] px-2 py-1 text-lg rounded"
            >
              <FaTrashAlt></FaTrashAlt>
            </button>

            <button
              onClick={() => handleAdoptedChange(info.row.original)}
              className="bg-[#F69585] text-white px-2 py-1 text-xs rounded"
            >
              {info.row.original.adopted === "true" ? "Adopted" : "Adopt"}
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: myPet,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // handle delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/pets/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: `Delete successfully done!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // handle adopted status
  const handleAdoptedChange = (item) => {
    const newStatus = item?.adopted === "false" ? "true" : "false";
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this pet as ${
        newStatus === "true" ? "Adopted" : "Unadopted"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/pets/${item._id}`, { adopted: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Updated!",
                showConfirmButton: false,
                timer: 1500,
                text: `The pet has been marked as ${
                  newStatus === "true" ? "Adopted" : "Unadopted"
                }.`,
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>My Pet - PetCare</title>
      </Helmet>
      <div className="px-2">
        <h1 className="text-2xl md:text-5xl text-center mb-5 font-bold dark:text-white">
          My Added Pets
        </h1>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-300 text-[10px] md:text-xs">
            <thead className="bg-gray-200 dark:bg-[#17191E] dark:text-white text-[11px] md:text-sm uppercase">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border border-gray-300 p-2 text-left cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="odd:bg-white even:bg-gray-100 hover:bg-gray-200 dark:bg-[#17191E] dark:text-white"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="border border-gray-300 p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {myPet.length > 10 && (
          <div className="flex justify-center mt-4 gap-2 text-[11px] md:text-sm">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              First
            </button>

            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            {/* Page display */}
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
            {/* Last page button */}
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Last
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MyAddedPet;

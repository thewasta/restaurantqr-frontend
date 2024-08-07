import { ColumnDef } from "@tanstack/react-table";
import { FaSort } from "react-icons/fa";
import ProductTableActionsRows from "@/components/products/table-actions-row";
import {Product} from "@/_lib/dto/productDto";
interface ProductsColumnsProps {
    onDelete: (bankAccount: any) => void;
}
export const getProductColumns = ({onDelete}:ProductsColumnsProps): ColumnDef<Product>[] => [
    {
        accessorKey: 'id',
        header: ({ column }) => {
            return (
                <button
                    className={"flex items-center gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Nº</span>
                    <FaSort />
                </button>
            )
        },
        cell: ({row}) => {
            return parseInt(row.id) + 1;
        }
    },
    {
        accessorKey: 'image',
        header: 'Imagen',
        cell: (cell) => {
            const imageFilePath = cell.getValue();
            return (
                <img className={"object-cover h-16 w-12"} src={`https://api-dev.click2eat.es/${imageFilePath}`}
                     alt={"image product"}/>
            );
        }
    },
    {
        id: 'name',
        accessorKey: 'name',
        header: 'Nombre',
    },
    {
        accessorKey: 'price',
        header: ({ column }) => {
            return (
                <button
                    className={"flex items-center gap-1"}
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <span>Precio</span>
                    <FaSort />
                </button>
            )
        },
    },
    {
        accessorKey: 'category',
        header: 'Categoría',
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        cell: (cell) => {
            return cell.getValue() === 1 ? 'Activo' : 'Inactivo'
        }
    },
    {
        id: 'actions',
        cell: ({row}) => <ProductTableActionsRows row={row} onDelete={onDelete}/>
    }
];
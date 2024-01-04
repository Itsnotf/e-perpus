import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TablePengembalian from "@/components/Tables/TablePengembalian";

export default function pengembalian() {
  return (
    <>
      <Breadcrumb pageName="Pengembalian" />
      <div>
        <TablePengembalian />
      </div>
    </>
  );
}

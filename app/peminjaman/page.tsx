import React from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CardDataStats from "@/components/CardDataStats";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import TableThree from "@/components/Tables/TableThree";

export default function peminjaman() {
  return (
    <>
      <Breadcrumb pageName="Peminjaman" />
      <div>
        <TableThree />
      </div>
    </>
  );
}

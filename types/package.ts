export type Package = {
  name: string;
  nim: number;
  status: string;
  tanggalPengembalian: Date;
  tanggalPeminjaman: Date;
  kodeBuku: number;
  buku: string;
};

export const packageData = [
  {
    name: "Muhammad Akbar Aditya",
    status: "Selesai",
    nim: 20393434,
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: 1234,
    buku: "Express Dasar",
  },
  {
    name: "Faiz aflah Hafizuddin",
    status: "Belum",
    nim: 20393434,
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: 1234,
    buku: "Next Js Dasar",
  },
  {
    name: "Fariz aflah Hariz Ibrahim",
    status: "Selesai",
    nim: 20393434,
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: 1234,
    buku: "Js Dasar",
  },
  {
    name: "Amal Iksani",
    status: "Belum",
    nim: 20393434,
    tanggalPeminjaman: new Date(2004, 4, 2), // 2 Mei 2004
    tanggalPengembalian: new Date(2004, 4, 6), // 6 Mei 2004
    kodeBuku: 1234,
    buku: "Php Dasar",
  },
];

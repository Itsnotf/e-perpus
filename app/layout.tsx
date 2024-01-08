'use client'
import './globals.css'
import './data-tables-css.css'
import './satoshi.css'
import { useState, useEffect, useRef } from 'react'
import Loader from '@/components/common/Loader'
import SignIns from './auth/signin/page'
import { Authentication } from '@/service/auths/login'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Package } from '@/types/package'
import { ApiResponse } from '@/types/request'
import { TResponseGetPeminjaman } from '@/types/peminjaman'
import usePeminjamanState from '@/hooks/usePeminjamanState'
import {
  convertGetPeminjaman,
  convertGetPengembalian,
} from '@/utils/convertApiResponse'
import usePengembalianState from '@/hooks/usePengembalianState'
import useStatisticState from '@/hooks/useStatisticState'
import { calculateDateDifference } from '@/utils/hitungJarakTanggal'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)
  const peminjamanState = usePeminjamanState()
  const pengembalianState = usePengembalianState()
  const statisticState = useStatisticState()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log('Sudah Masuk')
        setLogin(true)
      } else {
        console.log('Belum ada akun')
        setLogin(false)
      }
    })
  }, [])

  // init peminjaman data
  useEffect(() => {
    ;(async () => {
      const response: ApiResponse = await (
        await fetch('/api/peminjaman')
      ).json()

      const convertedObjects: Package[] = convertGetPeminjaman(response)

      peminjamanState.setData(convertedObjects)
    })()
  }, [])

  // init pengembalian data
  useEffect(() => {
    ;(async () => {
      const response: ApiResponse = await (
        await fetch('/api/pengembalian')
      ).json()

      const convertedObjects: Package[] = convertGetPengembalian(response)
      pengembalianState.setData(convertedObjects)
    })()
  }, [])

  // init pengembalian data
  useEffect(() => {
    ;(async () => {
      const response: ApiResponse | any = await (
        await fetch('/api/statistic')
      ).json()

      const data = {
        jumlahPeminjam: response.data.anggota,
        jumlahBukuDikembalikan: response.data.bukuDikembalikan,
        jumlahBukuBelumDikembalikan: response.data.bukuBelumDikembalikan,
        denda: statisticState.denda,
      }
      console.log({ data })

      statisticState.setData(data)
    })()
  }, [])

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {login ? (
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <div className="flex h-screen overflow-hidden">
                {/* <!-- ===== Sidebar Start ===== --> */}
                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Sidebar End ===== --> */}

                {/* <!-- ===== Content Area Start ===== --> */}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                  {/* <!-- ===== Header Start ===== --> */}
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                  {/* <!-- ===== Header End ===== --> */}

                  {/* <!-- ===== Main Content Start ===== --> */}
                  <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                      {children}
                    </div>
                  </main>
                  {/* <!-- ===== Main Content End ===== --> */}
                </div>
                {/* <!-- ===== Content Area End ===== --> */}
              </div>
            )}
          </div>
        ) : (
          <SignIns />
        )}
      </body>
    </html>
  )
}

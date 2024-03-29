'use client'
import './globals.css'
import './data-tables-css.css'
import './satoshi.css'
import { useState, useEffect } from 'react'
import Loader from '@/components/common/Loader'
import SignIns from './auth/signin/page'
import { Authentication } from '@/service/auths/login'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import { Package } from '@/types/package'
import { ApiResponse } from '@/types/request'
import usePeminjamanState from '@/hooks/usePeminjamanState'
import { convertGetPengembalian } from '@/utils/convertApiResponse'
import usePengembalianState from '@/hooks/usePengembalianState'
import useStatisticState from '@/hooks/useStatisticState'
import useInitStates from '@/hooks/useInitStates'
import useBukuState from '@/hooks/useBukuState'
import useAnggotaState from '@/hooks/useAnggotaState'
import useCredential from '@/hooks/useCredential'
import { getCredential } from '@/utils/cookie'
import { hitungDenda } from '@/utils/hitungDenda'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // state
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(true)

  // costume state hooks dengan zustand
  const { setEmail, setTipePelajar, tipePelajar } = useCredential()
  const peminjamanState = usePeminjamanState()
  const pengembalianState = usePengembalianState()
  const statisticState = useStatisticState()
  const bukuState = useBukuState()
  const anggotaState = useAnggotaState()

  // init
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  useEffect(() => {
    useInitStates({
      tipePelajar,
      anggotaState,
      bukuState,
      peminjamanState,
      pengembalianState,
      statisticState,
    })
  }, [tipePelajar])

  useEffect(() => {
    statisticState.addDenda(hitungDenda(peminjamanState, statisticState))
  }, [peminjamanState])

  // console.log({ tipePelajar })

  // auth
  useEffect(() => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        getCredential(user.email as string).then((credential) => {
          setEmail(credential?.email)
          setTipePelajar(credential?.tipePelajar)
        })

        console.log('Sudah Masuk')
        setLogin(true)
      } else {
        console.log('Belum ada akun')
        setLogin(false)
      }
    })
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

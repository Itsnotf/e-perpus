import React, { useEffect, useRef, useState, ReactNode } from 'react'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
}

const CostumeDropdown: React.FC<DropdownProps> = ({ trigger, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dropdown = useRef<any>(null)

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return
      if (!dropdownOpen || dropdown.current.contains(target)) return
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [dropdownOpen])

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (dropdownOpen && keyCode === 27) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  }, [dropdownOpen])

  return (
    <div className="relative w-full">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      <div
        ref={dropdown}
        className={`absolute max-h-48 overflow-y-auto right-0 top-full z-40 w-full space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default CostumeDropdown

import { getServerUser } from '@/lib/auth/jwt'
import React from 'react'
import Navbar from './Navbar'

const NavbarWithUser = async () => {
    const user = await getServerUser()
  return (
    <Navbar user={user}/>
  )
}

export default NavbarWithUser
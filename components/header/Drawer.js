import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import InfoIcon from '@material-ui/icons/Info'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import Link from 'next/link'
import * as React from 'react'
import { logOut } from '../customHook'

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <div className="pt-3 w-44 md:w-64">
      <Link href="/">
        <a className="block font-serif text-xl hover:bg-gray-200">
          <div className="flex space-x-4">
            <div className="pt-2 ml-5 h-12">
              <SportsEsportsIcon />
            </div>
            <span className="pt-2 pl-2 text-xl">Home</span>
          </div>
        </a>
      </Link>
      <Link href="/about">
        <a className="block font-serif text-xl hover:bg-gray-200">
          <div className="flex space-x-4">
            <div className="pt-2 ml-5 h-12">
              <InfoIcon />
            </div>
            <span className="pt-2 pl-2 text-xl">About</span>
          </div>
        </a>
      </Link>
      <Link href="/posts/setting">
        <a className="block font-serif text-xl hover:bg-gray-200">
          <div className="flex space-x-4">
            <div className="pt-2 ml-5 h-12">
              <SettingsIcon />
            </div>
            <span className="pt-2 pl-2 text-xl">Setting</span>
          </div>
        </a>
      </Link>
      <Link href="/signin">
        <a onClick={() => logOut()} className="block font-serif text-xl hover:bg-gray-200">
          <div className="flex space-x-4">
            <div className="pt-2 ml-5 h-12">
              <ExitToAppIcon />
            </div>
            <span className="pt-2 pl-2 text-xl">Logout</span>
          </div>
        </a>
      </Link>
    </div>
  )
  return (
    <div>
      {['right'].map((anchor) => (
        <div key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </div>
  )
}

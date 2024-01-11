import React, { useContext } from 'react'

import Note from './Note';

export default function Home(props) {
  return (
    <div>

      <div className='container'><Note showAlert={props.showAlert} setAlert={props.setAlert}></Note></div>

    </div>
  )
}

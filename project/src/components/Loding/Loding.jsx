import React from 'react'
import RingLoader from 'react-spinners/RingLoader';

export default function Loding() {
  
  return (
    <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <span style={{ margin: 'auto' }}>
      <RingLoader color="#36d7b7" loading="true" size={180}/>
    </span>
  </div>
  )
}

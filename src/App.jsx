import { useState } from 'react'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <div className='min-h-screen bg-bg w-screen'>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    </>
  )
}

export default App

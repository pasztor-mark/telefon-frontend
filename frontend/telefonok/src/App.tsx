
import Phones from './pages/Phones.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UjTelefon from './pages/ujTelefon.tsx'
import { LoadingContext } from './loadingContext.tsx'
import {useContext} from 'react'


export default function App() {
  const ctx = useContext(LoadingContext)
  return (
    <>
    <h1>telefon</h1>
    <a href="/new">Új telefon</a>
    <a href="/">Honlap</a>
    {
      ctx.isLoading ?
      <>Loading...</>
      :
      <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Phones/>}></Route>
          <Route path='new' element={<><UjTelefon/><Phones/></>}></Route>
        </Route>
      </Routes>
      </BrowserRouter>
    }


    
    </>
  )
}
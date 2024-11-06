import { useState, useEffect, useContext } from "react"
import { LoadingContext } from "../loadingContext"
import { Phone } from "../Phone"

function UjTelefon() {
  const { setIsLoading } = useContext(LoadingContext)

  const [nextIndex, setNextIndex] = useState(0)
  useEffect(() => {
    async function getPhoneCount() {
      setIsLoading(true)
      await fetch("http://localhost:3000/phones").then((response) => {
        return response.json()
      }).then((data) => { setNextIndex(data.length + 1) }).catch((error) => { })
      setIsLoading(false)
    }
    getPhoneCount()
  }, [])
  async function handleNewPhone(e: any) {
    e.preventDefault()
    setIsLoading(true)
    const Brand = e.target.brand.value
    const Model = e.target.model.value
    const Price = e.target.price.value

    var newPhone = JSON.stringify({
      Id: nextIndex,
      Brand,
      Model,
      Price
    })

    await fetch("http://localhost:3000/phones", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: newPhone
    })
    setNextIndex(prevState => prevState + 1)
    setIsLoading(false)
  }


  return (
    <>
      <h1>uj</h1>
      <form onSubmit={handleNewPhone}>
        <label htmlFor="brand">brand</label>
        <input type="text" name="brand" placeholder="Apple" />
        <label htmlFor="model">model</label>
        <input type="text" name="model" placeholder="iPhone" />
        <label htmlFor="price">price</label>
        <input type="number" name="price" placeholder="800000" />
        <button type="submit">felvétel</button>
      </form>
    </>
  )
}

export default UjTelefon

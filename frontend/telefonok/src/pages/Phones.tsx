import { useEffect, useState, useContext } from "react"
import { Phone, Phones } from "../Phone"
import { LoadingContext } from "../loadingContext"


function PhoneList() {
    const [phones, setPhones] = useState([] as Phone[])

    const { setIsLoading } = useContext(LoadingContext)


    useEffect(() => {
        async function getPhones() {
            setIsLoading(true)

            await fetch("http://localhost:3000/phones").then((response) => {
                return response.json()
            }).then((data) => { setPhones(data) }).catch((error) => { })
            setIsLoading(false)
        }
        getPhones()
    }, [])
    async function deletePhone(id) {
        await fetch("http://localhost:3000/phones/" + id, { method: "DELETE" })
    }
    return (
        <>
            <ul>
                {
                    phones.map(phone => (
                        <li key={phone.Id}>
                            {
                                <><b>#{phone.Id}</b> <b>{phone.Brand}</b> <p>{phone.Model}</p> <p>{phone.Price} Ft</p> <button onClick={() => deletePhone(phone.Id)}>Törlés</button></>
                            }
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default PhoneList

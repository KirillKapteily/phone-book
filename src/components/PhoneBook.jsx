import { useState } from "react"

export default function PhoneBook() {
    const [data, setData] = useState({
        contacts: [],
        name: "",
        number: "",
        filter: ""
    });

    const hanndleChange = (event) => {
        const { name, value } = event.target;

        setData((c) => ({
            ...c, [name]: value
        }))
    }

    function hanndleSubmit(event) {
        event.preventDefault();
        const contact = { name: data.name, number: data.number };

        if (data.contacts.some((c) => c.name.toLowerCase() == data.name.toLocaleLowerCase())) {
            return
        }

        setData((p) => ({
            ...p,
            contacts: [...p.contacts, contact],
            name: "",
            number: ""
        }))
    }


    function deleteCont(i) {
        const updatedContacts = data.contacts.filter((_, index) => index !== i);
        setData((p) => ({
            ...p,
            contacts: updatedContacts
        }));

    }


    const filteredContacts = data.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(data.filter.toLowerCase())
    )



    return (
        <>
            <form onSubmit={hanndleSubmit}>
                <h2>Name</h2>
                <input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    onChange={hanndleChange}
                    value={data.name}
                    required
                />
                <h2>Number</h2>
                <input
                    type="tel"
                    name="number"
                    onChange={hanndleChange}
                    value={data.number}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
                <button type="submit">Add</button>
            </form>

            <div>
                <input type="text" name="filter" placeholder="search" value={data.filter} onChange={hanndleChange} />
                <ul>
                    {filteredContacts.map((cont, i) => <li key={i}>{cont.name}{cont.number}</li>)}
                </ul>
            </div>


            <ol>
                {data.contacts.map((cont, i) => <li key={i}>
                    {cont.name} {cont.number}
                    <button type="button" onClick={() => deleteCont(i)}>Delete</button>
                </li>)}
            </ol>
        </>
    )
}
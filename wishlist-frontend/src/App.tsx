import { useState } from "react";

import Greeting from "./components/greetPage"

export default function App() {

    const [gifts,setGifts] = useState<string[]>(['книга', 'часы'])
    const [newGift,setNewGift] = useState('');
    // add element
    
    function addGift(e: React.FormEvent) {
        e.preventDefault();
        if (newGift.trim()) {
            setGifts([...gifts, newGift.trim()]);
            setNewGift('')
        }
        // const newGift = prompt('что добавить в вишлист?');
        // if (newGift) {
        //     setGifts([...gifts,newGift])
        // }
    }
    
    // delete element


    function removeGift(index: number) {
        setGifts(gifts.filter((_, i)=> i !== index))
    }


    //// return
    return (
        <div>
            <form onSubmit={addGift}>
            <input
            type='text'
            placeholder="введите подарок"
            value={newGift}
            onChange={(e) => setNewGift(e.target.value)}
            />
            </form>






            <ul>
                {gifts.map((gift, index) => 
                <li key={index}>
                    {gift} <button onClick={() => removeGift(index)}> delete</button>
                    </li>
                )}
            </ul>
            <button onClick={addGift} > добавить подарок</button>
        </div>
    );
}
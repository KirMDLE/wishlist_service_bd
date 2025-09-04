import { useEffect, useState } from "react";
import api from "./api";
import type { Gift } from "./types/types";

export default function App() {

const [gifts, setGifts] = useState<Gift[]>([]);
    const [newGift,setNewGift] = useState('');

    // api from back
    useEffect(()=>{
        api.get<Gift[]>('/gifts').then((res) => setGifts(res.data));
        }, [])

    
    // add element
    
    async function addGift(e: React.FormEvent) {
        e.preventDefault();
        if (newGift.trim()) return;
        
        const res = await api.post<Gift>('/gifts', {title: newGift.trim()})
            setGifts([...gifts, res.data]);
            setNewGift('')
        }

    
    
    // delete element


    async function removeGift(id: number) {
        await api.delete(`/gifts/${id}`);
        setGifts(gifts.filter((g)=> g.id !== id))
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
                    {gift.title} <button onClick={() => removeGift(index)}> delete</button>
                    </li>
                )}
            </ul>
            <button onClick={addGift} > добавить подарок</button>
        </div>
    );
}
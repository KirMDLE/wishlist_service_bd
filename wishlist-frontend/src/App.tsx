import { useEffect, useState } from "react";
import api from "./api";
import type { Gift } from "./types/types";
import type React from "react";

export default function App() {

const [gifts, setGifts] = useState<Gift[]>([]);
    const [newGift,setNewGift] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    // api from back
    useEffect(() => {
        let mounted = true;
        (async () => {
          setLoading(true)
          setError(null)
          try {
            const res = await api.get<Gift[]>("/gifts")
            if (mounted) setGifts(res.data);
          } catch {
            if (mounted) setError("error");
          } finally {
            if (mounted) setLoading(false)
          }
        })()
        return () => {
          mounted = false
        }
      }, []);
    
    
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
        const prev = gifts;
        setGifts((g) => g.filter((item) => item.id !== id));
        try {
          await api.delete(`/gifts/${id}`);
        } catch {
          setError("error1");
          setGifts(prev);
        }
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
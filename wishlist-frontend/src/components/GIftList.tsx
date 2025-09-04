import type { FC } from "react";

import type { Gift } from "../types/types";


interface GiftsProps {
    gifts: Gift[];
    onRemove: (id:number) => void;
}

const GiftList: FC<GiftsProps> = ({gifts, onRemove}) => {
    return (
        <ul>
        {gifts.map((gift)=>(
            <li key={gift.id}>
                {gift.title} <button onClick={() => onRemove(gift.id)}>delete it</button>
            </li>
        ))}
        </ul>
    )
};


export default GiftList;
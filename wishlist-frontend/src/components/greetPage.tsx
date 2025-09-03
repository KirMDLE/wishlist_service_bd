interface GreetingProps {
    name: string;
}

export default function Greeting({name}: GreetingProps) {
    return <h2>Heloo, {name}</h2>;
}
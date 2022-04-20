import Hero from '../components/hero'
import Features from "../components/homepage/features";

const navigation = [
    {name: 'Product', href: '#'},
    {name: 'Features', href: '#'},
    {name: 'Marketplace', href: '#'},
    {name: 'Company', href: '#'},
];

export default function Home() {
    return (
        <div>
            <Hero title={"Animalib"}
                  description={"Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt ametfugiat veniam occaecat fugiat aliqua."}
            />
        </div>
    )
}

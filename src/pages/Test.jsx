import { Link } from "react-router-dom"
const Test = () => {
    return (
        <div style={{width: '100vw', margin: '50px auto', fontSize: '18px'}}>
            test page
            <div style={{margin: '20px auto', width: '300px'}}>
                <Link to='/'>back to index</Link>
            </div>

        </div>
    )
}

export default Test
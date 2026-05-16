import useState from 'react';

export default function CharCount(){
    const [text, setText] = useState("");

    return(
        <div>
            <h1>Char Count</h1>
            <textarea placeholder='Type Here' value={text} onChange={(e)=>setText(e.target.value)} />
            <div>
                {text.length} characters
            </div>

        </div>
    )
}
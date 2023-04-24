

export default function Die (props) {
    const bkg = props.isHeld ? "#0B2434" : "white" 
    const color = props.isHeld ? "white"  : "#0B2434" 
    return (
        <section style={{background:bkg , color: color}} onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </section>
    )
}
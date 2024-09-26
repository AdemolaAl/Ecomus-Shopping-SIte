export default function Popup({ open, message = 'Action Successful' }) {
    return (
        <div className={`popup2 ${open}`}>
            <div className="first">
                <i class="fa-solid fa-check"></i>
            </div>
            <div className="second">
                <p>SUCCESS</p>
                <p>{message}</p>
            </div>

        </div>
    )

}
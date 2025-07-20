export default function Popup({ open, message = "Action Successful", type }) {
  if (type == "success") {
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
    );
  }
  if (type == "error") {
    return (
      <div className={`popup2 ${open}  error`}>
        <div className="first">
         <i class="fa-solid fa-xmark"></i>
        </div>
        <div className="second">
          <p>ERROR</p>
          <p>{message}</p>
        </div>
      </div>
    );
  }
}

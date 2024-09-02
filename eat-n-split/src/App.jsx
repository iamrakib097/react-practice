import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [show, setShow] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectId, setSelectId] = useState(null);
  function handleSplitBill(balnc) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectId.id
          ? { ...friend, balance: friend.balance + balnc }
          : friend
      )
    );
  }
  function onClick() {
    setShow((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} onSetSelectId={setSelectId} />
        {show && <FormAddFriend onSetFriends={setFriends} friends={friends} />}
        <Button onClick={onClick}>{show ? "Close" : "Add Friend"}</Button>
      </div>
      {selectId && (
        <FormSplitBill
          friends={friends}
          onSetFriends={setFriends}
          onSplitBill={handleSplitBill}
          onSetSelectId={setSelectId}
          selectId={selectId}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSetSelectId }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend key={friend.id} friend={friend} onSetSelectId={onSetSelectId} />
      ))}
    </ul>
  );
}

function Friend({ friend, onSetSelectId }) {
  return (
    <li>
      <img src={friend.image} alt="" srcSet="" />
      <h3>{friend.name}</h3>
      <p
        style={
          friend.balance < 0
            ? { color: "red" }
            : friend.balance > 0
            ? { color: "green" }
            : { color: "black" }
        }
      >
        {friend.balance < 0
          ? `You owe ${friend.name} ${Math.abs(friend.balance)}$`
          : friend.balance > 0
          ? `${friend.name} owes you ${friend.balance}$`
          : `You and ${friend.name} are even`}
      </p>
      <Button onClick={() => onSetSelectId(friend)}>Select</Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend({ friends, onSetFriends }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleOnSubmit(e) {
    e.preventDefault();
    if (name == "" || image == "") return;
    const id = crypto.randomUUID();
    const newObj = {
      name,
      id,
      image: "https://i.pravatar.cc/48" + `?${id}`,
      balance: 0,
    };
    onSetFriends([...friends, newObj]);
  }
  return (
    <form className="form-add-friend" onSubmit={(e) => handleOnSubmit(e)}>
      <label>🧔🏻Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🌄Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectId, onSplitBill, onSetSelectId }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [paying, setPaying] = useState("you");

  function calculation(e) {
    e.preventDefault();
    let balance = paying === "you" ? bill - expense : bill - (bill - expense);
    onSplitBill(balance);
    onSetSelectId(null);
  }

  return (
    <div>
      <form action="" className="form-split-bill">
        <h2>SPLIT A BILL WITH {`${selectId.name}`}</h2>
        <label>💰Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />

        <label>🕺Your expense</label>
        <input
          type="text"
          value={expense}
          onChange={(e) =>
            setExpense(
              Number(e.target.value) > bill ? expense : Number(e.target.value)
            )
          }
        />

        <label>🧍‍♂️ {`${selectId.name}`}'s expense</label>
        <input type="text" disabled value={bill - expense} />
        <label>🤑Who is paying the bill?</label>
        <select
          name=""
          id=""
          value={paying}
          onChange={(e) => setPaying(e.target.value)}
        >
          <option value="you">You</option>
          <option value="friend">{selectId.name}</option>
        </select>
        <Button onClick={(e) => calculation(e)}>Split Bill</Button>
      </form>
    </div>
  );
}

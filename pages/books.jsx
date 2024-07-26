import axios from "axios";
import { useState, useEffect } from "react";

export default function Books() {
  const [books, setBooks] = useState();

  // console.log(books, "books");

  // console.log({ books });
  const fetch = async () => {
    // console.log("hello");
    try {
      const res = await axios.get("http://localhost:3000/books");
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="w-full min-h-dvh">
      {books?.map((item, index) => (
        <div key={index}>
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
}

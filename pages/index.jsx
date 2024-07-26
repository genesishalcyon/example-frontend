import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState();
  const fetchData = async () => {
    console.log("hello world");
    try {
      const res = await axios.get("http://localhost:3000/test");

      setEmployees(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {employees?.map((item, index) => (
        <div key={index}>{item?.name}</div>
      ))}
    </div>
  );
}

import Layout from "../components/layout";
import { useEffect, useState } from "react";
import axios from "axios";

function Python() {
  const [dateToday, setDateToday] = useState();
  useEffect(() => {
    axios
      .get("/api/date")
      .then((res) => {
        console.log(res);
        res.json();
      })
      .then((data) => {
        console.log(data);
        setDateToday(data);
      });
  }, [dateToday]);

  return (
    <Layout title='Testing Python'>
      Fetches data from python
      {dateToday}
    </Layout>
  );
}

export default Python;

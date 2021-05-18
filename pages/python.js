import Layout from "../components/layout";
import { useEffect, useState } from "react";

function Python() {
  const [dateToday, setDateToday] = useState();
  useEffect(() => {
    fetch("/api/date")
      .then((res) => res.json())
      .then((data) => setDateToday(data));
  }, [dateToday]);
  return (
    <Layout title='Testing Python'>
      Fetches data from python
      {dateToday}
    </Layout>
  );
}

export default Python;

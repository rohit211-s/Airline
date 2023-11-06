import axios from "axios";
import { useEffect, useState } from "react";
import constants from "../../config/config";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const getSampleData = async () => {
    const resp = await axios.get(
      constants.BACKEND_URL + constants.SAMPLE_API_PATH
    );

    setData(resp.data);
  };

  useEffect(() => {
    getSampleData();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default Dashboard;

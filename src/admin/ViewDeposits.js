import React from "react";
import { getDeposits } from "../services/authService";

const ViewDeposits = () => {
  const [deposits, setDeposits] = React.useState([]);
  console.log("ViewDeposits deposits state:", deposits);
  const fetchDeposits = async () => {
    try {
      const response = await getDeposits();
      console.log("fetchDeposits response:", response);
      if (response.success) {
        setDeposits(response.data);
      }
    } catch (error) {
      console.error("fetchDeposits error:", error);
    }
  };

  React.useEffect(() => {
    fetchDeposits();
  }, []);

  return <div>hello from View Deposits</div>;
};

export default ViewDeposits;

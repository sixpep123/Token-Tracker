import axios from "axios";

const GetData = async () => {
  try {
    const data = await axios.get(
      "http://18.60.59.48:3000/portal/chain?chain=ethereum"
    );
    return data.data.data;
  } catch (error) {
    return error;
  }
};

export default GetData;

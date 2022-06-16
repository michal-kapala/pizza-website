import { useState } from "react";
import Axios from "axios";

function useGetSpecialOffer() {
  // Error text state
  const [errorText, setErrorText] = useState("");

  // Request special offer by the code
  async function getSpecialOffer(setSpecialOffer, code) {
    var newList = [];
    if(code == "")
      code = 'nocode';
    try {
      const response = await Axios.get(`${process.env.REACT_APP_ENDPOINT}/offers/${code}`);
      newList.push(response.data);
      setErrorText("");
    }
    // 404 is handled here
    catch(err) {
      console.error(err);
      setErrorText("Invalid code, please try again");
    }
    setSpecialOffer(newList);
  };

  return { errorText, getSpecialOffer };
};

export { useGetSpecialOffer };
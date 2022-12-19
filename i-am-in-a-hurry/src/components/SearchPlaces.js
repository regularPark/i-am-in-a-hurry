import React, { useState } from "react";
import MapContainer from "./MapContainer";

function SearchPlaces() {
  const [InputText, setInputText] = useState("");
  const [Place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(InputText);
    setInputText("");
  };

  const btnBGK = () => {
    setPlace("버거킹");
  };

  const btnToilet = () => {
    setPlace("화장실");
  };

  const btnSubwayStn = () => {
    setPlace("지하철역");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="검색어를 입력하세요"
          onChange={onChange}
          value={InputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={Place} />
      <button onClick={btnBGK}>버거킹</button>
      <button onClick={btnToilet}>화장실</button>
      <button onClick={btnSubwayStn}>지하철역</button>
    </>
  );
}

export default SearchPlaces;

import React from "react";
import Header from "../../components/layout/Header";
import NavBar from "../../components/layout/NavBar";

const MyPage = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <h1>마이 페이지</h1>
      </div>
      <NavBar />
    </div>
  );
};

export default MyPage;

import React from "react";
import Header from "../../../components/layout/MainHeader";
import NavBar from "../../../components/layout/NavBar";
import CategoryColumn from "./CategoryColumn";

type CategoryRowData = {
  title: string;
  location?: string;
  menu?: string;
  price?: string;
  description?: string;
  image: string;
};

interface DetailwProps {
  data: CategoryRowData[];
  title?: string;
}

const Detail = ({ data, title }: DetailwProps) => {
  return (
    <div className="flex flex-col bg-white h-screen pb-20">
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <div className="flex-1 p-6 overflow-y-auto scrollbar-hide">
        {title && <h2 className="text-xl font-bold text-grayscale-90 mb-6">{title}</h2>}

        {data.length > 0 ? (
          <CategoryColumn data={data} />
        ) : (
          <p className="text-sm text-grayscale-70">항목이 없습니다.</p>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Detail;

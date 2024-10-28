import QuoteCard from "./QuoteCard";
import FloatingPill from "../../components/FloatingPill";
import ShimmerMain from "../../components/ShimmerMain";
import { getAllQuotes } from "../../utils/appApi";
import { useCallback, useEffect } from "react";
import { apiCall } from "../../utils/api";

const Dashboard = () => {
  const getQuotes = () => {
    const params = {
      limit: 20,
      offset: 0,
    };
    apiCall("GET", "/getQuotes", null, params).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <div className="container m-auto">
      <div className="p-5 ">
        <div className="flex justify-between md:mx-10 lg:mx-14">
          <div className="text-5xl">Quote</div>
          <button className="text-3xl">👤</button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {Array(20)
            .fill()
            .map((index) => (
              <QuoteCard key={index} />
            ))}
          <ShimmerMain />
        </div>
      </div>
      <FloatingPill />
    </div>
  );
};

export default Dashboard;

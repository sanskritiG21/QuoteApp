import QuoteCard from "./QuoteCard";
import FloatingPill from "../../components/FloatingPill";
import ShimmerMain from "../../components/ShimmerMain";
import { getAllQuotes } from "../../utils/appApi";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const getQuotes = () => {
    setLoading(true);
    const params = {
      limit: 20,
      offset: offset,
    };
    getAllQuotes(null, params)
      .then(({ data: { data: cardsData } }) => {
        setQuotesData(cardsData);
      })
      .finally(() => {
        setLoading(false);
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
          {!loading ? (
            quotesData.map((data, index) => (
              <QuoteCard key={index} data={data} />
            ))
          ) : (
            <ShimmerMain />
          )}
        </div>
      </div>
      <FloatingPill />
    </div>
  );
};

export default Dashboard;

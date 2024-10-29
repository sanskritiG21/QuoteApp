import QuoteCard from "./QuoteCard";
import ShimmerMain from "../../components/ShimmerMain";
import { getAllQuotes } from "../../utils/appApi";
import { useEffect, useState } from "react";
import { removeToken } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import CreateQuote from "../CreateQuote";

const Dashboard = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(740);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    removeToken("token");
  };

  const getQuotes = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    console.log(offset);

    const params = {
      limit: 20,
      offset: offset,
    };

    getAllQuotes(null, params)
      .then(({ data: { data: cardsData } }) => {
        if (cardsData.length < 20) {
          setHasMore(false);
        }
        setQuotesData((prevData) => [...prevData, ...cardsData]);
        setOffset((prevOffset) => {
          console.log(prevOffset, "pre");
          return prevOffset + 20;
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      getQuotes();
    }
  };

  // InfiniteScroll
  useEffect(() => {
    getQuotes();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className=" bg-gradient-to-b from-blue-950 via-purple-800 to-gray-950 text-white">
      <div className="container m-auto">
        <div className="p-5 ">
          <div className="flex justify-between md:mx-10 lg:mx-14">
            <div className="text-5xl">Quote</div>
            <button
              className="p-2 px-10 bg-slate-900/50 rounded-3xl hover:bg-purple-900/50 shadow-lg shadow-black/20"
              onClick={handleLogout}>
              logout
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {quotesData.map((data, index) => (
              <QuoteCard key={index} data={data} />
            ))}
            {loading && <ShimmerMain />}
          </div>
        </div>
        <CreateQuote />
      </div>
    </div>
  );
};

export default Dashboard;

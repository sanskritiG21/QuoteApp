import "./styles.css";
import QuoteCard from "./QuoteCard";
import ShimmerMain from "../../components/ShimmerMain";
import { getAllQuotes } from "../../utils/appApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { removeToken } from "../../utils/localstorage";
import { useNavigate } from "react-router-dom";
import CreateQuote from "../CreateQuote";

const LIMIT = 20;

const Dashboard = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    removeToken("token");
  };

  const getQuotes = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);

    const params = {
      limit: LIMIT,
      offset: offsetRef.current,
    };

    getAllQuotes(null, params)
      .then(({ data: { data: cardsData } }) => {
        if (cardsData.length < LIMIT) {
          setHasMore(false);
        }
        setQuotesData((prevData) => [...prevData, ...cardsData]);
      })
      .finally(() => {
        setLoading(false);
      });
    offsetRef.current += LIMIT;
  }, [offsetRef]);

  const handleScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 100
    ) {
      getQuotes();
    }
  }, [offsetRef]);

  // InfiniteScroll
  useEffect(() => {
    getQuotes();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="container m-auto">
        <div className="p-5 ">
          <div className="header">
            <div className="text-5xl">Quote</div>
            <button className="logout-btn" onClick={handleLogout}>
              logout
            </button>
          </div>
          <div className="cards-container">
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

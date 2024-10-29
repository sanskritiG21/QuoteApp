import "./styles.css";
import QuoteCard from "./QuoteCard";
import ShimmerMain from "../../components/ShimmerMain";
import { getAllQuotes } from "../../utils/appApi";
import { useCallback, useEffect, useRef, useState } from "react";
import CreateQuote from "../CreateQuote";
import { CALLED_BY } from "../../utils/constant";

const LIMIT = 20;

const Dashboard = () => {
  const [quotesData, setQuotesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const offsetRef = useRef(0);

  const getQuotes = useCallback(
    (calledBy) => {
      if (loading || !hasMore) return;

      setLoading(true);

      const params = {
        limit: LIMIT,
        offset: offsetRef.current,
      };

      getAllQuotes(null, params)
        .then(({ data: { data: cardsData }, error }) => {
          if (!error) {
            if (cardsData.length < LIMIT) {
              setHasMore(false);
            }
            setQuotesData((prevData) => [...prevData, ...cardsData]);
          }
          if (calledBy === CALLED_BY.FUNCTION) {
            offsetRef.current += LIMIT;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [hasMore, loading]
  );

  const handleScroll = useCallback(() => {
    if (!hasMore || loading) return;

    const isBottomReached =
      window.scrollY + window.innerHeight === document.body.scrollHeight;

    if (isBottomReached) {
      getQuotes(CALLED_BY.FUNCTION);
    }
  }, [hasMore, loading, getQuotes]);

  useEffect(() => {
    getQuotes(CALLED_BY.HOOK);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="dashboard-container">
      <div className="container m-auto">
        <div className="p-5 ">
          <div className="header">
            <div className="text-5xl">Quote</div>
          </div>
          <div className="cards-container">
            {quotesData.map((data = {}, index) => (
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

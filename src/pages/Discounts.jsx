import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Discounts() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings"); //reference to the collection

        // prepare query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // execute query
        const querySnapshot = await getDocs(q);
        const listings = [];
        querySnapshot.forEach((doc) => {
          return listings.push({ id: doc.id, data: doc.data() });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Unable to fetch category list ");
      }
    };

    fetchListings();
  }, []);
  return (
    <>
      <div className="category">
        <header>
          <p className="pageHeader">Discounts</p>
        </header>

        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <main>
              <ul className="categoryListings">
                {listings.map((listing) => (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.data}
                  />
                ))}
              </ul>
            </main>
          </>
        ) : (
          <p>
            There are no discounts currently unavailable. Please try again later
          </p>
        )}
      </div>
    </>
  );
}

export default Discounts;

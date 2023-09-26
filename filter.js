import { useEffect, useState } from "react";
import Item from "../Item/Item";

const FeaturedCatagory = ({ inputValue }) => {
  let [donationItems, setDonationItems] = useState([]);
  let [searchResults, setSearchResults] = useState([]);
  let [searchResultshave, setsearchResultshave] = useState(false);

  useEffect(() => {
    fetch("cart.json")
      .then((res) => res.json())
      .then((data) => {
        setDonationItems(data);
      });
    if (inputValue) {
      const handleSearch = () => {
        const results = donationItems.filter((category) =>
          category.category.toLowerCase().includes(inputValue.toLowerCase())
        );
        setSearchResults(results);
        setsearchResultshave(true);
      };

      handleSearch();
    }
    if (inputValue.length == 0) {
      setsearchResultshave(false);
    }
  }, [inputValue]);

  console.log("search", inputValue);

  return (
    <div className="mt-5">
      <h2 className="mb-5 text-center">Donation items</h2>
      <div className="grid grid-cols-4 gap-3">
        {searchResultshave
          ? searchResults.map((item) => (
              <Item key={item.id} donationItem={item}></Item>
            ))
          : donationItems.map((donationItem) => (
              <Item key={donationItem.id} donationItem={donationItem}></Item>
            ))}
      </div>
    </div>
  );
};

export default FeaturedCatagory;

// donationItems.map((donationItem) => (
//     <Item key={donationItem.id} donationItem={donationItem}></Item>
//   ))

import { useEffect, useState } from "react";

const useFilteredProductsList = (productsList) => {
  // Filter the productsList by value of Search field
  const [filter, setFilter] = useState("");

  const [food, setFood] = useState({
    pizzas: [],
    burgers: [],
    drinks: [],
  });

  // Filter the filteredProductsList for each category
  useEffect(() => {
    // Filter the entire Products Collection by the value of Search Input Field
    let filteredList = productsList.filter((e) =>
      e.Name.toLowerCase().match(filter.toLowerCase())
    );
    // Filter the pizzas
    let pizzas = filteredList.filter((e) => e.Category === "pizza");
    let burgers = filteredList.filter((e) => e.Category === "burgers");
    let drinks = filteredList.filter((e) => e.Category === "drinks");

    // Set the state
    setFood({
      ...food,
      pizzas: pizzas,
      burgers: burgers,
      drinks: drinks,
    });
  }, [filter]);

  return { setFilter, food };
};

export { useFilteredProductsList };

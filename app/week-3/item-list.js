import Item from "./item";

export default function ItemList() {
    const item1 = {
        name: "milk, 4 L 🥛",
        quantity: 1,
        category: "dairy",
      };
       
      const item2 = {
        name: "bread 🍞",
        quantity: 2,
        category: "bakery",
      };
       
      const item3 = {
        name: "eggs, dozen 🥚",
        quantity: 2,
        category: "dairy",
      };
       
      const item4 = {
        name: "bananas 🍌",
        quantity: 6,
        category: "produce",
      };
       
      const item5 = {
        name: "broccoli 🥦",
        quantity: 3,
        category: "produce",
      };
       
      const item6 = {
        name: "chicken breasts, 1 kg 🍗",
        quantity: 1,
        category: "meat",
      };
       
      const item7 = {
        name: "pasta sauce 🍝",
        quantity: 3,
        category: "canned goods",
      };
       
      const item8 = {
        name: "spaghetti, 454 g 🍝",
        quantity: 2,
        category: "dry goods",
      };
       
      const item9 = {
        name: "toilet paper, 12 pack 🧻",
        quantity: 1,
        category: "household",
      };
       
      const item10 = {
        name: "paper towels, 6 pack",
        quantity: 1,
        category: "household",
      };
       
      const item11 = {
        name: "dish soap 🍽️",
        quantity: 1,
        category: "household",
      };
       
      const item12 = {
        name: "hand soap 🧼",
        quantity: 4,
        category: "household",
      };

      return (
        <div className="inline-block my-5 p-3 mx-3">
          <ul className="bg-green-100"><Item item={item1} /></ul>
          <ul className="bg-green-100"><Item item={item2} /></ul>
          <ul className="bg-green-100"><Item item={item3} /></ul>
          <ul className="bg-green-100"><Item item={item4} /></ul>
          <ul className="bg-green-100"><Item item={item5} /></ul>
          <ul className="bg-green-100"><Item item={item6} /></ul>
          <ul className="bg-green-100"><Item item={item7} /></ul>
          <ul className="bg-green-100"><Item item={item8} /></ul>
          <ul className="bg-green-100"><Item item={item9} /></ul>
          <ul className="bg-green-100"><Item item={item10} /></ul>
          <ul className="bg-green-100"><Item item={item11} /></ul>
          <ul className="bg-green-100"><Item item={item12} /></ul>


        </div>

      );
    }
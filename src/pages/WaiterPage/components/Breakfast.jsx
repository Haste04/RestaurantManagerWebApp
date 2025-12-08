import React, { useState } from "react";

const Breakfast = ({ onAddOrder }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // LOCAL DATA — load images from assets
  const breakfastImages = import.meta.glob("../../../assets/breakfast/*", {
    eager: true,
  });

  const images = Object.fromEntries(
    Object.entries(breakfastImages).map(([path, module]) => {
      const fileName = path.split("/").pop();
      return [fileName, module.default];
    })
  );

  // Breakfast items
  const breakfastItems = [
    { id: 1, name: "Pancake", price: 150.12, image: images["pancake.jpg"] },
    {
      id: 2,
      name: "Corned Beef",
      price: 67.12,
      image: images["cornbeef.webp"],
    },
    { id: 3, name: "Sausage", price: 4000.67, image: images["sausage.jpg"] },
    { id: 4, name: "Tocino", price: 6767.67, image: images["tocino.jpg"] },
  ];

  const handleSelect = (item) => {
    setSelectedItem(item);
    setQuantity(1); // reset quantity
  };

  return (
    <>
      {/* ITEMS LIST */}
      <div className="flex flex-wrap gap-4 mt-5">
        {breakfastItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="w-42 h-60 bg-[#212E4A] rounded-lg shadow-md flex flex-col hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            {/* IMAGE */}
            <div className="w-full h-40 overflow-hidden rounded-t-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="px-4 pb-2 mt-2 text-white">
              <div className="font-bold text-1xl">{item.name}</div>
              <div className="flex flex-row justify-between items-center gap-2 mt-2">
                ₱{item.price.toFixed(2)}
                <button className="bg-[#BF7000] px-3 py-2 rounded-md hover:bg-[#e07b1f] transition-all text-sm duration-200 cursor-pointer">
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-[#212E4A] rounded-xl p-5 w-80 text-white shadow-lg">
            {/* IMAGE */}
            <div className="w-full h-40 rounded-md overflow-hidden mb-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover hover:scale-110 transition-all duration-200"
              />
            </div>

            {/* NAME + PRICE */}
            <h2 className="text-xl font-bold">{selectedItem.name}</h2>
            <p className="text-lg mb-3">₱{selectedItem.price.toFixed(2)}</p>

            {/* QUANTITY SELECTOR */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="cursor-pointer bg-gray-600 px-3 py-1 rounded-md hover:bg-gray-500 transition-all duration-200"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="cursor-pointer bg-gray-600 px-3 py-1 rounded-md hover:bg-gray-500 transition-all duration-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onAddOrder(selectedItem, quantity); // Add to global order
                  setSelectedItem(null); // Close modal
                }}
                className="bg-[#BF7000] px-4 py-2 rounded-md hover:bg-[#e07b1f] cursor-pointer"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Breakfast;

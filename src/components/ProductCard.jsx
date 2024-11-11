import React from "react";

function ProductCard(props) {
  const {
    productName = "Khaki Pant",
    prize = 100,
    size = ["S", "M", "L"],
    imgUrl,
  } = props;
  function SizeBox({ s }) {
    return (
      <div className="w-8 h-8 bg-gray-600 flex justify-center items-center rounded-md">
        {s}
      </div>
    );
  }
  return (
    <div className="bg-gray-100 w-[450px] h-[600px] flex flex-col justify-end rounded-2xl shadow-2xl mb-4 ">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <img src={imgUrl} alt="Product Img" width="340px" height="500px" />
      </div>
      <div className="h-[120px] bg-gray-100  p-3 ">
        <h2 className="text-md font-medium ">{productName}</h2>
        <h1 className="text-2xl font-bold">₹{prize}</h1>
        {
          <div className="flex w-[35%] flex-row justify-between mt-2 ">
            {size?.map((item) => (
              <SizeBox s={item} />
            ))}
          </div>
        }
      </div>
    </div>
  );
}

export default ProductCard;

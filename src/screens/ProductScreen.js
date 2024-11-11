import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";
import { Button, Select } from "@chakra-ui/react";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));

    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      }),
    );
  };

  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + quantity);
  };

  function selectSize(s) {
    setSelected(s);
  }

  if (loading) {
    return (
      <div className="bg-gray-100 w-full h-full">
        <h1>Loading...</h1>
      </div>
    );
  }
  function productDataa() {
    return [
      {
        name: "Brand",
        value: product.brand,
      },
      {
        name: "Price",
        value: product.price,
      },
      {
        name: "Description",
        value: product.description,
      },
    ];
  }

  if (!loading && product) {
    const productData = productDataa();

    return (
      <div className="bg-gray-100 pt-10 mx-10 h-[70rem]">
        {error ? (
          <div>{error} </div>
        ) : (
          <>
            <div className="flex flex-row w-screen justify-start mx-10">
              <div className="flex flex-col w-[10%] mr-4">
                {["img1"].map((item) => (
                  <div className="w-full mr-2 h-32 border-2 border-black mt-6">
                    <img src="" alt={item}></img>
                  </div>
                ))}
              </div>
              <div className="w-[35%] h-[38rem] flex justify-center items-center shadow-xl ">
                <img
                  src={product.image}
                  alt="product"
                  className="w-[100%] h-[100%] rounded-md"
                ></img>
              </div>
              <div className="px-6 w-[40%] h-[38rem] gap-y-4 flex flex-col ml-6 border-2 border-gray-200 rounded-lg shadow-2xl">
                <h1 className="text-4xl font-semibold pt-6">{product.name}</h1>

                {productData.map((item) => (
                  <div className="flex flex-row w-[40rem] justify-start items-start">
                    <p className="text-gray-600 w-[6rem] text-sm">
                      {item.name}{" "}
                    </p>
                    {item.name === "Price" ? (
                      <h2 className="  w-96 break-words ml-6 text-3xl font-bold mt-[-10px]">
                        {item.value} /-
                      </h2>
                    ) : (
                      <h2 className="   w-96 break-words ml-6">{item.value}</h2>
                    )}
                  </div>
                ))}

                <div className="flex flex-row justify-start w-[40rem]">
                  <h2 className="text-gray-600 text-sm w-[6rem]">Status:</h2>
                  {product.countInStock > 0 ? (
                    <p className="inline-block text-black ml-6">
                      {product.countInStock} Available
                    </p>
                  ) : (
                    <p className="text-red-400 inline-block ml-6">
                      {" "}
                      Out of Stock
                    </p>
                  )}
                </div>

                {product.countInStock ? (
                  <div className="w-40">
                    <Select
                      placeholder="select quantity"
                      size="sm"
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Select>
                  </div>
                ) : null}
                <div className="w-full flex flex-row items-center">
                  <h2 className="text-gray-600 text-sm w-[6rem]">
                    Select Size :
                  </h2>
                  <div className="flex flex-row justify-around w-28">
                    {["M", "L"].map((s) => (
                      <div
                        className={`border-2 ml-6 w-8 h-8 border-black rounded-[10rem] flex justify-around items-center cursor-pointer ${s === selected ? "bg-black text-white" : ""}`}
                        onClick={() => selectSize(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row gap-y-4 w-full gap-x-3 mt-4">
                  <Button
                    style={{
                      background: "black",
                      color: "white",
                      width: "16rem",
                    }}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    style={{
                      background: "black",
                      color: "white",
                      width: "16rem",
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-center w-[38%] items-end rounded-lg shadow-2xl mt-6">
              {/* {!product.reviews.length && <div>There is no review</div>} */}
              <ul className="review" id="reviews">
                {product.reviews.map((review) => (
                  <li key={review._id}>
                    <div>{review.name}</div>
                    <div>
                      <Rating value={review.rating}></Rating>
                    </div>
                    <div>{review.createdAt.substring(0, 10)}</div>
                    <div>{review.comment}</div>
                  </li>
                ))}
                <li>
                  <h3 className="text-lg">Write a customer review</h3>
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="rating">Rating</label>
                          <select
                            name="rating"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very Good</option>
                            <option value="5">5- Excelent</option>
                          </select>
                        </li>
                        <li>
                          <label htmlFor="comment">Comment</label>
                          <textarea
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </li>
                        <li>
                          <button
                            type="submit"
                            className="bg-black text-white border rounded-lg w-[50%]"
                          >
                            Submit
                          </button>
                        </li>
                      </ul>
                    </form>
                  ) : (
                    <div>
                      Please <Link to="/signin">Sign-in</Link> to write a
                      review.
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
}
export default ProductScreen;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Rating from "../components/Rating";
import ProductCard from "../components/ProductCard";
import { TailSpin } from "react-loader-spinner";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));

    return () => {
      //
    };
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-300">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#1a232d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  console.log(products);

  return (
    <>
      {category && <h2>{category}</h2>}
      <div className="h-auto">
        <div className="w-screen h-96 bg-gradient-to-b from-gray-200 to-gray-100 flex flex-col items-center justify-center ">
          <div className="flex flex-col justify-center items-center w-screen">
            <h1 className="text-7xl font-semibold text-gray-500">
              Wrap Yourself in Style,
            </h1>
            <span className="text-4xl   mt-8 text-gray-500">
              Where Fabric Meets Fashion!
            </span>
          </div>
        </div>
        <div className="h-content bg-gradient-to-b from-gray-100 to-gray-50 p-6 flex flex-wrap gap-x-4 gap-y-8 justify-start pl-16 items-center mb-24 ">
          {products.map((product) => (
            <Link to={"/product/" + product._id}>
              <ProductCard
                productName={product.name}
                prize={product.price}
                size={product.size ? product.size : []}
                imgUrl={product.image}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </li>
        <li>
          Sort By{' '}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Newest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price}</div>
                <div className="product-rating">
                  <Rating
                    value={product.rating}
                    text={product.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )} */}
    </>
  );
}
export default HomeScreen;

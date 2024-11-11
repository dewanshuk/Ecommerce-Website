import React, { useEffect, useState } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const [quantity, setQuantity] = useState(qty);
  const [isCoupan, setIsCoupan] = useState(false);
  const cart = useSelector((state) => state.cart);
 


  const { cartItems } = cart;

  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    if(cartItems.length ===1) props.history.push('/cart/');
    
    dispatch(removeFromCart(productId));
  };
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  function cartQuantity(e, item) {
    dispatch(addToCart(item.product, e.target.value));
    setQuantity(e.target.value);
  }

  function checkCoupanCode() {
    console.log("fired");
  }
  return (
    <div className="cart h-content  flex flex-row ">
      <div className="cart-list h-content w-screen flex flex-row justify-around shadow-2xl">
        <ul className="cart-list-container w-2/3">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item) => (
              <li>
                <div className="cart-image">
                  <img src={item.image} alt="product" className="w-48" />
                </div>
                <div className="cart-name gap-y-2 ml-6">
                  <div className="font-semibold text-xl">
                    <Link to={"/product/" + item.product}>{item.name}</Link>
                  </div>
                  <p>{item.brand}</p>

                  <div className="mt-2 ">
                    Qty:
                    <div className="w-20  inline-block ml-4">
                      <Select
                        style={{
                          display: "inline-block",
                          border: "1px solid gray",
                        }}
                        size="sm"
                        onChange={(e) => cartQuantity(e, item)}
                        defaultValue={quantity}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <p>{item.size}</p>
                    <br />
                    <Button
                      type="button"
                      style={{
                        background: "black",
                        color: "white",
                        marginTop: "18px",
                      }}
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="cart-price">₹{item.price}</div>
              </li>
            ))
          )}
        </ul>
        {cartItems.length !== 0 ? (
          <div className="w-1/4 flex flex-col items-center  my-10 py-6  shadow-2xl  bg-gradient-to-b from-gray-300 to-gray-100  gap-y-8 border-2 rounded-lg">
            {/* Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
        ₹ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)} */}
            {/* <h3 className='font-semibold'>Subtitle:</h3>
        {cartItems.map(item=>(
          <p className='mt-3'>{item.name} x <span className='ml-1'>{item.qty}</span></p>
        ))}
        <hr className='border-1 border-gray-800 w-40'/> */}
            <TableContainer style={{ width: "90%" }}>
              <Table variant="simple" size="md">
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr>
                      <Td>{item.name} </Td>
                      <Td>{item.qty} </Td>
                      <Td>x {item.price}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <hr className="border-1 border-gray-600 mt-[-15px] w-80" />
            <div className="flex  justify-between w-[80%]">
              <h2 className="text-xl font-semibold mr-4">Total Amount </h2>
              <h2 className="text-2xl font-semibold">
                {cartItems.reduce((accumulator, curr, idx) => {
                  accumulator =
                    accumulator + Number(curr.qty) * Number(curr.price);
                  return accumulator;
                }, 0)}
              </h2>
            </div>
            <p
              onClick={() => setIsCoupan(true)}
              className="text-sm flex justify-end w-[80%] my-[-20px] cursor-pointer text-blue-700 italic"
            >
              Have a Coupan ?{" "}
            </p>
            {isCoupan ? (
              <div className="flex flex-col my-[-10px] gap-y-1 w-[80%]">
                <Input placeholder="Enter Coupan Code here.." />
                <div className="flex flex-row justify-around">
                  <Button
                    onClick={checkCoupanCode}
                    style={{
                      background: "blue",
                      color: "white",
                      borderRadius: "8px",
                      width: "8rem",
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    onClick={() => setIsCoupan(false)}
                    style={{
                      background: "gray",
                      color: "white",
                      borderRadius: "8px",
                      width: "8rem",
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : null}
            <Button
              onClick={checkoutHandler}
              style={{ width: "75%", background: "black", color: "white" }}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </Button>
          </div>
        ) : (
          <p className="mt-6">Add Items to Cart</p>
        )}
      </div>
    </div>
  );
}

export default CartScreen;

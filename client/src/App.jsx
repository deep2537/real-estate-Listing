import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/createlisting";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
const App = () => {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>} />
        <Route path="/listing/:listingId" element={<Listing/>} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/createlisting" element={<CreateListing />} />
          <Route path="/updatelisting/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

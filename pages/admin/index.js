"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "./compo/layoutt/sidebar/Sidebar";
import Header from "./compo/layoutt/header/Header";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));



export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [element, setElement] = useState(0);
  const [list, setlist] = useState(["play cricket", "play video game", "play soccer"])
  const [radioValue, setRadioValue] = useState()
  const [radioValue2, setRadioValue2] = useState()

  const countries = [
    {
      name: "India",
      value: "IN",
      cities: [
        'Delhi',
        'Mumbai'
      ]
    },
    {
      name: "Japan",
      value: "Jp",
      cities: [
        'Tokyo',
        'Nagasakhi'
      ]
    },
    {
      name: "America",
      value: "USA",
      cities: [
        'New York',
        'Los Vegas'
      ]
    },
  ]

  const sports = ["Cricket", "Football", "Tennis", "Rugby"];
  const days = ["Sunday", "Monday"]

  // const eelist = ["play cricket", "play video game", "play soccer"];

  const handleDelete = (index) => {
    const ilist = list.filter((el) => el !== list[element]);
    setlist(ilist)
  }

  console.log(list)

  const handleChange = (e) => {
    setRadioValue(e.target.value);
  }
  const handleChange2 = (e) => {
    setRadioValue2(e.target.value);
  }


  return (
    <MainWrapper className="mainwrapper">
      <style jsx global>{`
        .navbar {
          display: none;
        }
        footer{
          display: none;
        }
        
      `}</style>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}
        {/* <div className="block my-3">

          <select
          onChange={handleChange}>
            {countries.map((item, index) => (
              <option key={index} value={index}>{item.name}</option>
            ))}
          </select>
        </div>


        <div>
          <select>
            {countries[element].cities.map((item, index) => (
              <option key={index} value={item}>{item}</option>
              
            ))}
          </select>
        </div> */}

        <div className="flex flex-col align-center justify-center">


          <div className="flex flex-row">
            {sports.map((item, index) => (
              <div key={index} >
                <input type="radio" value={item} onChange={(e) => setRadioValue(e.target.value)} />{item}
              </div>
            ))}
          </div>
          {days.map((item, index) => (
            <div key={index}>
              <input type="radio" checked={radioValue2 === item} value={item} onChange={handleChange2} />{item}
            </div>
          ))}

          <p>{radioValue} on {radioValue2}</p>





          {/* {list.map((item, index) => (
            <div key={index} className="flex">

              <input type="checkbox" id="vehicle3" name="vehicle3" value={index} />

              &nbsp;&nbsp;&nbsp; <p> {item} </p> &nbsp;&nbsp;&nbsp;&nbsp;

              <button className="text-red-600 border-blue-600">Delete</button>

            </div>

          ))} */}





        </div>









        <Container
          sx={{
            paddingTop: "20px",
            maxWidth: "1200px",
          }}
        >
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}

          {/* ------------------------------------------- */}
          {/* Footer */}
          {/* ------------------------------------------- */}



        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}

import React, { useCallback, useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { FormFact } from "../components/FormFact";

export const Sell = () => {

  return (
    <>
      <Navbar />
      <FormFact />
      <Footer />
    </>
  );
};

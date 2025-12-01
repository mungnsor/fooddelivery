"use client";
import { Header } from "./features/header";
import { Footer } from "./features/footer";
import { HeroSlider } from "./features/heroslider";
import { Card } from "./features/card";
import { useEffect, useState } from "react";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzZiMzEwNzJlZDg5ODcwMzQxM2Y0NzkyYzZjZTdjYyIsIm5iZiI6MTczODAyNjY5NS44NCwic3ViIjoiNjc5ODJlYzc3MDJmNDkyZjQ3OGY2OGUwIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.k4OF9yGrhA2gZ4VKCH7KLnNBB2LIf1Quo9c3lGF6toE",
  },
};
export default function Home() {
  const backend_url = process.env.PUBLIC_BACKEND_URL;
  const [foods, setFoods] = useState([]);
  const [foodMenu, setFoodMenu] = useState([]);
  const getData = async () => {
    const data = await fetch(`${backend_url}/foodCategory`, options);
    const jsonData = await data.json();
    setFoodMenu(jsonData);
    console.log(jsonData, "category");
  };
  const getFood = async () => {
    const data = await fetch(`${backend_url}/food`, options);
    const jsonData = await data.json();
    setFoods(jsonData);
    console.log(jsonData, "food");
  };
  useEffect(() => {
    getData();
    getFood();
  }, []);
  return (
    <>
      <Header />
      <HeroSlider />
      {foodMenu.map((item, index) => {
        return (
          <Card
            key={index}
            categoryName={item.categoryName}
            categoryId={item._id}
            totalfood={item.food}
          />
        );
      })}
      <Footer />
    </>
  );
}

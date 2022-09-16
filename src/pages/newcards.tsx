import React, { useState } from "react";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

interface NewCardsProps {}

const NewCards = ({}: NewCardsProps) => {
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const newCard = trpc.useMutation(["card.createCard"]);

  const divStyling = "flex flex-col text-purple-300 text-3xl font-bold gap-2";

  //   const handleNewCard = async () => {
  //       await newCard.mutateAsync({
  //           front:
  //       })
  //   }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <>
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-purple-200 text-lg font-bold">
          Front - Target Sentence <br />
          Back - Target Word and it's definition
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col p-4 gap-4 w-96">
            <div className={divStyling}>
              Front
              <input
                value={formData.front}
                onChange={handleChange}
                name="front"
                className="rounded-md p-3 text-black text-lg"
              />
            </div>
            <div className={divStyling}>
              Back
              <input
                value={formData.back}
                onChange={handleChange}
                name="back"
                className="rounded-md p-3 text-black text-lg"
              />
            </div>
            <button className="px-6 py-4 m-3 rounded-md bg-purple-200 text-2xl text-center font-bold hover:bg-purple-100 duration-300 w-56 self-center">
              Create Card
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default NewCards;

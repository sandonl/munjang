import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import Header from "../components/Header";
import { trpc } from "../utils/trpc";

interface NewCardsProps {}

const NewCards = ({}: NewCardsProps) => {
  const { data: session } = useSession({ required: true });
  const [cardSubmitted, setCardSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const newCard = trpc.useMutation(["card.createCard"]);

  const divStyling = "flex flex-col text-purple-300 text-3xl font-bold gap-2";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(formData.front && formData.back)) {
      setErrors(true);
      setTimeout(() => {
        setErrors(false);
      }, 3000);
      return;
    } else {
      await newCard.mutateAsync({
        ...formData,
        userId: session?.user?.id!,
      });
      setFormData({ front: "", back: "" });
      setCardSubmitted(true);
      setTimeout(() => {
        setCardSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <Head>
        <title> 문장 - MUNJANG - New Cards </title>
      </Head>
      <Header />
      <div className="center-items">
        <div className="border border-purple-300 rounded-md w-6/12 p-10 pt-12 flex flex-col justify-center items-center ">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-4 gap-4 w-96">
              <div className={divStyling}>
                <div
                  className="tooltip cursor-pointer text-left"
                  data-tip="Front - Target Sentence"
                >
                  <h3> Front </h3>
                </div>
                <input
                  value={formData.front}
                  onChange={handleChange}
                  name="front"
                  className="input input-primary"
                />
              </div>
              <div className={divStyling}>
                <div
                  className="tooltip cursor-pointer text-left"
                  data-tip="Back - Target Word and it's definition"
                >
                  <h3>Back </h3>
                </div>
                <input
                  value={formData.back}
                  onChange={handleChange}
                  name="back"
                  className="input input-primary"
                />
              </div>
              <button className="btn btn-primary">Create Card</button>
            </div>
          </form>
          <div className="text-red-200 font-bold text-center h-3">
            {errors ? "Please enter text for both the front and back" : ""}
          </div>
          <div className="text-green-200 font-bold text-center h-3">
            {cardSubmitted ? "Card Created! " : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default NewCards;

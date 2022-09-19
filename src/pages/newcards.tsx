import { useSession } from "next-auth/react";
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
      <Header />
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-purple-200 text-lg font-bold text-center">
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
        <div className="text-red-200 font-bold text-center h-3">
          {errors ? "Please enter text for both the front and back" : ""}
        </div>
        <div className="text-green-200 font-bold text-center h-3">
          {cardSubmitted ? "Card Created! " : ""}
        </div>
      </div>
    </>
  );
};
export default NewCards;

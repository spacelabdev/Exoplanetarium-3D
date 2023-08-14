import HomeButton from "../../components/shared/HomeButton";
import "./FAQ.scss";
import { useState } from "react";

function FAQ() {
  const [clicked, setClicked] = useState(false);

  const toggle = (index) => {
    if (clicked === index) {
      return setClicked(null);
    }

    setClicked(index);
  };

  const data = [
    {
      question: "How can I see information on a specific Exoplanet?",
      answer:
        "You can either click on the planet in the 3D visualization or search for the planet in the database.",
    },

    {
      question: "Where does the data come from?",
      answer:
        "This data comes from NASA and Caltech from the K2, Tess, and Keplar missions.",
    },

    {
      question: "How can I become a contributor to Spacelab?",
      answer:
        "You can find us on LinkedIn, or email us your resume at recruiting@spacelab.space.",
    },
  ];

  return (
    <section className="faq-container">
      <section className="faq-content">
        <h1>Questions? Look Here.</h1>
        {data.map((item, index) => (
          <div
            className="faq-accordion"
            onClick={() => toggle(index)}
            key={index}
          >
            <div className="faq">
              <p className="faq-question">{item.question}</p>

              {clicked === index && <p className="faq-answer">{item.answer}</p>}
            </div>
            <span>{clicked === index ? "-" : "+"}</span>
          </div>
        ))}
        <p className="faq-content-footer">
          Still can't find an answer? Email us at help@spacelab.space
        </p>
      </section>

      <HomeButton />
    </section>
  );
}

export default FAQ;

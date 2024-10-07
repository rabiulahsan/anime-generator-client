import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import FAQItem from "./FAQItem";

const Questions = () => {
  const faqs = [
    {
      question: "What is the best AI Image Generator?",
      answer:
        "There are several great AI image generators available today, each with unique features and strengths. Some popular options include DALL-E, Midjourney, and Stable Diffusion, depending on your specific needs and artistic style.",
    },
    {
      question: "How does AI Image Generation work?",
      answer:
        "AI image generation typically uses neural networks and large datasets to create images based on text prompts. The models learn from vast amounts of data and can produce images that resemble real-world objects and scenes.",
    },
    {
      question: "Can AI-generated images be used commercially?",
      answer:
        "Yes, many AI-generated images can be used for commercial purposes, but it is important to check the licensing and terms of service of the platform you are using to ensure compliance with usage rights.",
    },
    {
      question: "How accurate are AI-generated images?",
      answer:
        "The accuracy of AI-generated images depends on the quality of the model and the input prompt. While AI is becoming increasingly sophisticated, some generated images may still have minor imperfections or distortions.",
    },
    {
      question: "Can I customize AI-generated images?",
      answer:
        "Yes, many AI image generators offer customization options. You can tweak various settings, such as style, resolution, and specific visual elements, to create images tailored to your preferences.",
    },
  ];

  return (
    <div className="mb-[5%]">
      <SectionTitle heading="Insightful Answers to Common Questions"></SectionTitle>
      <div className="mx-[5%] px-[4%]">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default Questions;

import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Style/About.css";
import facebookImg from "../Images/facebook.png";
import gmailImg from "../Images/gmail.png";
import phoneImg from "../Images/phone-call.png";
import NavigateBefore from "@mui/icons-material/NavigateBefore";
import NavigateNext from "@mui/icons-material/NavigateNext";
import Image1 from "../Images/480282231_4137050093244286_1283169661060604225_n.jpg";
import Image2 from "../Images/497679355_4223495187933109_4693298582754720504_n.jpg";

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminID");

    // If there's an adminID and not on the admin page, redirect to admin
    if (storedAdmin && window.location.pathname !== "/admin") {
      navigate("/admin");
    }
  }, [navigate]);
  const facebookUrl = "https://www.facebook.com/Mrs.Bakers/";
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  const articles = [
    {
      content1:
        "Chef Jehan Damasco knew it outright. She was an unemployable chef in the province of Nueva Vizcaya.",
      image:
        "https://static.wixstatic.com/media/358a96_831ca2fa6a9a4698a7f42921515227c7~mv2.png/v1/fill/w_740,h_416,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/358a96_831ca2fa6a9a4698a7f42921515227c7~mv2.png",
      content2: `“During that time, wala gaanong restaurant o hotel dito sa Vizcaya. I’m a trained professional in cooking... 
      Pero bukas ‘yung mata ko na walang opportunity sa akin dito,” she admits in a documentary filmed by 
      international photographer and filmmaker Francisgum.`,
    },
    {
      content1: "",
      video: "https://www.youtube.com/embed/JtKXobtVcrs",
      content2: `It was 14 years ago that the multi-awarded chef and her young family moved to the province. She lived her whole life in the city, but to her, “there was something about this province that made [them] want to start a family here and call this province [their] home.”
      What started, however, as a chef’s realization that no opportunity would come to her working in the province became her husband’s decision to let her bloom as a chef by opening up a place of her own.
      That was 10 years ago. Last September 28, the restaurant and pastry shop celebrated a decade of serving food you would not only call good, but definitely top-tier.
      Her very own place became THE restaurant and pastry shop Novo Vizcayanos bring their visiting friends to. It is as its tagline goes: Mrs. Baker’s Restaurant and Pastry Shop is THE taste you just proudly like to share.
      But surviving for 10 long years in this highly competitive field was not an easy feat. Not many of her kind of restaurant survive for that long. It took Chef Jehan and her team immense passion and hard work to maintain the quality of its food for a decade.
      “Nu’ng simula, nasa kusina ako o nasa bakery, nagsisimula ng 1 A.M. Madilim pa, papasok na kami. We would start with the production of pan de sal. [After that,] we move on to hundreds of sweet and savory-filled breads. Then we move on to the production ng aming famous raisin bread and other loafs,” Chef Jehan recounts.`,
    },
    {
      content1: "",
      image:
        "https://static.wixstatic.com/media/358a96_1ab9fdef84dd47da82c76cd5e829f42e~mv2.png/v1/fill/w_740,h_415,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/358a96_1ab9fdef84dd47da82c76cd5e829f42e~mv2.png",
      content2: `Mrs. Baker’s, as everyone fondly calls it, is not only known for its delectable meals. It is also famous for its pastry and bread products. From its artisan breads—French baguette, sourdough, multi-grain bolete, along with many others—to everyone’s favorite bread football, all of which are available at the restaurant located in the province’s capital town Bayombong; its bakery arm, Panadera in the Municipality of Solano; and its own café, Mrs. B located at Salubris Medical Center, also in Solano.
      It comes as no wonder that she is known for her high-quality breads. Chef Jehan has been awarded multiple times in different local and international culinary cups, including one in 2015 where she was recognized as the Best Pastry Chef in the country.`,
    },
    {
      content1: "Sui Generis",
      image:
        "https://static.wixstatic.com/media/358a96_10d95f9d7bec487e8b6a304748124fad~mv2.png/v1/fill/w_740,h_414,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/358a96_10d95f9d7bec487e8b6a304748124fad~mv2.png",
      content2: `People coming from the city and foreigners visiting Nueva Vizcaya just know. Mrs. Baker’s is a class of its own, a restaurant Chef Jehan calls “a reflection of who she is as a chef.”
      “Maipagmamalaki ko na ang Mrs. Baker’s ay kakaiba. It’s unique. May sarili siyang character, may sarili siyang personality. Hindi siya ginaya o hinalintulad sa ibang restaurant.”`,
    },
    {
      content1: "",
      image:
        Image1,
      content2: `Mrs. Baker’s is what you call a gathering of everything its head chef learned—from other brilliant chefs, to her visits abroad, food-tasting in other countries, and her studies. It’s a collection of all her experiences built into an empire that conquered the Vizcayanos’ taste.
      Though a native of the urban life, Chef Jehan calls Mrs. Baker’s a truly Vizcayano restaurant.
      “Mrs. Bakers…is a lot of contradictions, like it’s modern structurally, yet something about it feels homey and familiar. People say it’s like a kind of restaurant you’ll find in the city, yet if you come here and be inside the restaurant, something about [Mrs.] Baker’s personifies Vizcaya.”
      Chef Jehan is one you can call an A+ chef. Her food is not basic. It’s not something you can whip just by Googling a recipe. In her own words, the food “at Mrs. Baker’s is a mixture of the traditional and her personal take on it—a more upscale version that nonetheless maintains the taste the locals enjoy.”
      So as long as there is only one me, I believe, there can only be one Mrs. Bakers,” she quips.
      Though a native of the urban life, Chef Jehan calls Mrs. Baker’s a truly Vizcayano restaurant.
      “Mrs. Bakers…is a lot of contradictions, like it’s modern structurally, yet something about it feels homey and familiar. People say it’s like a kind of restaurant you’ll find in the city, yet if you come here and be inside the restaurant, something about [Mrs.] Baker’s personifies Vizcaya.”
      Chef Jehan is one you can call an A+ chef. Her food is not basic. It’s not something you can whip just by Googling a recipe. In her own words, the food “at Mrs. Baker’s is a mixture of the traditional and her personal take on it—a more upscale version that nonetheless maintains the taste the locals enjoy."`,
    },
    {
      content1: "",
      image:
        "https://static.wixstatic.com/media/358a96_009c0af1d5ef4c54947d287286349e16~mv2.png/v1/fill/w_740,h_416,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/358a96_009c0af1d5ef4c54947d287286349e16~mv2.png",
      content2: `As a matter of fact, she has her own version of the dinakdakan, a native delicacy common in the provinces up North made of pork mask, pork ear, and loin simmered, grilled, sliced, then tossed in a vinaigrette of calamansi juice, mayonnaise, and pig’s brain pate, and added with leeks, ginger, and spices. While maintaining the indigenous way of cooking the pork dish, she adds her own touch by serving it bibimbap-style.
      “It’s in a Korean hotpot, covered, but when you open it in front of the guests, they can still smell the aroma of the smoking pot of grilled pork. Every local who tasted it, they claimed it is the Vizcayano dinakdakan,” she describes. 
      If that does not whet your appetite just yet, I don’t know what will.`,
    },
    {
      content1: "A Decade and Counting",
      image:
        "https://static.wixstatic.com/media/358a96_81527a26a4444ee39941b54d431b365e~mv2.png/v1/fill/w_740,h_416,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/358a96_81527a26a4444ee39941b54d431b365e~mv2.png",
      content2: `Chef Jehan’s dream for Mrs. Baker’s does not end with the restaurant and pastry shop turning a decade. 
      “I dream for Mrs. Baker’s to become a big part of the change in the food and service industry in Region 2—that it competes, or better yet, leads in improving the standard of the Novo Vizcayanos in terms of restaurant food and service,” she bravely declares.
      And with her team, whom she fondly calls her family and in whose presence Chef Jehan says she is not afraid to experiment, make mistakes, and learn, nothing seems to stand in their way toward this goal.`,
    },
    {
      content1: "",
      image:
        Image2,
      content2: `"I am proud of them—we share the same vision. I’m proud of the team that we have now. We are like a family. I know each and everyone in the team and their families as well. Our being a family is something that I feel proud of, because that is when I feel very much myself and at home in my own kitchen,” she shares.
      "A great dish for me is something that has a soul, reminiscent of a story, something cooked with passion,” she begins her story in the documentary.
      In the coming moooooore years, however, we are quite sure Mrs. Baker’s will see itself as Chef Jehan envisioned: a leader in Cagayan Valley’s food industry.
      “Ultimately, this is for the Vizcayanos.”"`,
    },
  ];

  const handleNextArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
      prevIndex === articles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevArticle = () => {
    setCurrentArticleIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="about-main">
      {/* About Section */}
      <div className="about-section">
        <b className="about-title">About</b>
        <h3>Mrs. Baker’s: Proudly Vizcayano</h3>
        <div className="article">
          <NavigateBefore
            className="icon left-arrow"
            onClick={handlePrevArticle}
            style={{ fontSize: "10vh" }}
          />
          <div className="content">
            <p className="article-heading">
              {articles[currentArticleIndex].content1}
            </p>
            {articles[currentArticleIndex].image && (
              <img
                src={articles[currentArticleIndex].image}
                alt="Article"
                className="article-image"
              />
            )}
            {articles[currentArticleIndex].video && (
              <iframe
                src={articles[currentArticleIndex].video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded YouTube Video"
                className="Video"
              ></iframe>
            )}
            <div className="article-content">
              <p
                className={`content-text ${
                  currentArticleIndex === 2 ? "long-text" : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html: articles[currentArticleIndex].content2.replace(
                    /\n/g,
                    ""
                  ),
                }}
              ></p>
            </div>
          </div>
          <NavigateNext
            className="icon right-arrow"
            onClick={handleNextArticle}
            style={{ fontSize: "10vh" }}
          />
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-section">
        <h3 className="Social-Title">Social Media & Contacts</h3>
        <div className="social-container">
          <Link to={facebookUrl} className="link">
            <div className="social-box">
              <img
                src={facebookImg}
                alt="Facebook logo"
                className="social-image"
              />
              <h4>Facebook</h4>
              <p>Connect with us on Facebook for updates and more.</p>
              <p className="click-here">Click here</p>
            </div>
          </Link>
          <Link to="mailto:contact@mrsbakerscafe.com" className="link">
            <div className="social-box">
              <img src={gmailImg} alt="Gmail logo" className="social-image" />
              <h4>Gmail</h4>
              <p>Reach us via Gmail for any inquiries or support.</p>
              <p className="click-here">Click here</p>
            </div>
          </Link>
          <div className="link">
            <div className="social-box">
              <img src={phoneImg} alt="Phone icon" className="social-image" />
              <h4>Telephone Number</h4>
              <p>Call us for immediate assistance or support. (078) 805 3500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from "react";
const servicesList = [
  {
    id: 1,
    title: "High-Quality Products",
    desciption: "We offer a curated selection go high-quality products.",
    image: "/images/home/services/assurance.png",
  },
  {
    id: 2,
    title: "Fast Deliery",
    desciption: "We deliver your order proptly",
    image: "/images/home/services/fast-delivery.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    desciption: "We offer a curated selection go high-quality products.",
    image: "/images/home/services/order.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    desciption: "We offer a curated selection go high-quality products.",
    image: "/images/home/services/gift.png",
  },
];

const Ourservices = () => {
  return (
    <div className="section-container mt-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <p className="subtitle">Our Story & SERVICES</p>
          <h2 className="title"> Our Jourey And Services</h2>
          <blockquote className="my-5 text-secondary leading-[30px]">
            "Software engineering is a discipline related to the development and
            management of software to ensure efficiency and high quality. It
            emphasizes the use of technology and systematic methods in software
            development to achieve optimal results. This involves employing
            software development processes and appropriate tools to meet
            requirements and standards."
          </blockquote>
          <button className="btn bg-red rounded-full px-5 gap-2 text-white">
            Explore
          </button>
        </div>
        <div className="md:w-1/2">
          <div class="grid grid-rows-2 grid-flow-col gap-4">
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red curson-pointer hover:border
                 hover:border-indigo-600 transition-all duration-200"
              >
                <img src={service.image} alt="" className="mx-auto h-16" />
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-[#bd9090]">{service.desciption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Ourservices;

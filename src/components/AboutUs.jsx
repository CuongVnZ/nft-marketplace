// AboutUs.js

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Le Huu Tuong",
      role: "Founder",
      image: "/images/tuong.jpg",
    },
    {
      id: 2,
      name: "Trinh Quy Khang",
      role: "Developer",
      image: "/images/khang.jpg",
    },
    {
      id: 3,
      name: "Nguyen Tri Duc",
      role: "Designer",
      image: "/images/duc.jpg",
    },
  ];

  return (
    <div className="mt-12">
      <style>
        {`
          .about-us-container {
            max-width: 960px;
            margin: 0 auto;
          }

          .team-member {
            text-align: center;
          }

          .team-member img {
            border-radius: 50%;
            width: 150px; /* Độ rộng ảnh */
            height: 150px; /* Độ cao ảnh */
            object-fit: cover; /* Chế độ đổ ảnh */
            margin-bottom: 10px;
            display: block; /* Để căn giữa */
            margin-left: auto; /* Để căn giữa */
            margin-right: auto; /* Để căn giữa */
          }
        `}
      </style>
      <h2 className="text-2xl font-semibold mb-4">About Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-member">
            <img src={member.image} alt={member.name} />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-base text-gray-600">{member.role}</p>
            <p className="text-base mt-2">{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

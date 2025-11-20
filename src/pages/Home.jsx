export default function Home() {
  const teamMembers = [
    { name: "John Doe", role: "CEO", img: "" },
    { name: "Jane Smith", role: "CTO", img: "" },
    { name: "Alex Johnson", role: "Lead Developer", img: "" },
  ];

  return (
    <div className="fade-in-up mt-10 flex flex-col items-center justify-center text-white">
      <h1 className="md:text-6xl bg-gradient-to-r from-pink-400 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent">
        Welcome to Our Awesome Website!
      </h1>
      <p className="mt-4 text-lg text-gray-200 md:text-xl">
        Where innovation meets excellence.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="flex flex-col items-center rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 p-6 shadow-lg"
          >
            <img
              src={member.img}
              alt={member.name}
              className="mb-4 h-24 w-24 rounded-full"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-200">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

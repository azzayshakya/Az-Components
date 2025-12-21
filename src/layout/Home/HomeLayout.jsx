// import AdminMain from "@/admin/sidebar/managment-hook/AdminMain";


// const HomeUILayout = () => {
//   return (
//     <div className=" min-h-screen flex flex-col">
     
//       <AdminMain
//             userRole="admin"
//             userData={{ name: 'Ajay' }}
//           />
      
//     </div>
//   );
// };

// export default HomeUILayout;


import AdminMain from "@/admin/sidebar/managment-hook/AdminMain";

const HomeUILayout = () => {
  return (
    <AdminMain
      userRole="admin"
      userData={{ name: "Ajay" }}
    />
  );
};

export default HomeUILayout;

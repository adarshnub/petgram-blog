
// import React, { createContext, useContext, useState } from 'react';

// type LoadingContextProps = {
//   loading: boolean;
//   progress: number;
//   setProgress: React.Dispatch<React.SetStateAction<number>>;
// };

// const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

// export const LoadingProvider = ({ children }: {children:React.ReactNode}) => {
//   const [progress, setProgress] = useState(0);
//   const [loading, setLoading] = useState(true);

//   return (
//     <LoadingContext.Provider value={{ loading, progress, setProgress }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = () => {
//   const context = useContext(LoadingContext);
//   if (!context) {
//     throw new Error('useLoading must be used within a LoadingProvider');
//   }
//   return context;
// };

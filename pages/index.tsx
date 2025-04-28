import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();
  console.log(router.pathname); // ייתן לך את הנתיב הנוכחי
  return (
    <div>
      <h1>Welcome to the Pharmacy System</h1>
    </div>
  );
};

export default HomePage;

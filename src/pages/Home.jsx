const Home = () => {
  const backgroundImage = {
    backgroundImage: "url('/images/climbing-home.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100vh',
    width: '100vw'
  };

  return (
    <>
      <div className="homepage-image" style={backgroundImage}>
        <p></p>
      </div>
    </>
  );
};

export default Home;

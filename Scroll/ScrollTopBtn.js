//스크롤높이가 0인 지점으로 올라감
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

//스크롤 버튼이 300이상내려가면 버튼이 보이게
useEffect(() => {
  const handleShowButton = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleShowButton);
  return () => {
    window.removeEventListener("scroll", handleShowButton);
  };
}, []);

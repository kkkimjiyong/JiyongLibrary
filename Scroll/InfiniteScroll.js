 // 무한스크롤구현
 const [posts, Setposts] = useState([]);
 const [hasNextPage, setHasNextPage] = useState(true);
 const page = useRef(1);

 // json에서 페이지단위로 끊어서 가져오기
 const fetch = useCallback(async () => {
   try {
     const { data } = await axios.get(

        //백에서 데이터를 페이지네이션으로 나누어줘야함
       `https://hi-prac.shop/api/star/posts?page=${page.current}&pagesize=6`,
       {
         headers: {
           Authorization: `Bearer ${getCookie("token")}`,
         },
       }
     );
     console.log(data.data.length);
     Setposts((prevPosts) => [...prevPosts, ...data.data]);
     setHasNextPage(data.data.length == 6);
     //불러온 페이지의 데이터가 꽉차있으면 다음페이지로
     if (data.data.length) {
       page.current += 1;
     }

  // ref를 타겟으로 지정하고, 타겟이 뷰에 보이면 inView의 값이 True로
     const [ref, inView] = useInView({
        // 라이브러리 옵션
        //threshold는 ref타겟의 모습이 0~1만큼의 모습이 보이면 inview가 작동하는 값
        threshold: 1,
      });
    
      useEffect(() => {
        //ref타켓이 보이고, 다음페이지가 있으면 데이터get요청
        if (inView && hasNextPage) {
          // console.log(1);
          fetch();
        }
      }, [fetch, hasNextPage, inView]);


-------
//스크롤위치로 데이터get요청하는 방식도 있음. 근데 스크롤에 대한 이해가 아직 부족해서 마구잡이로 요청됨
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        fetch();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);




 //아래는 네비게이터를 실행할 때, 넣어주는 옵션 
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  //내 위치를 불러오는 것에 성공했을 때 , 실행되는 함수
  function success(position) {
    //현재 위치를 state값으로
    SetMyaddress({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }
  //불러오지 못했을 때 실행되는 함수.
  function error(err) {
    console.warn("ERROR(" + err.code + "): " + err.message);
  }
  
   //첫 랜더링시에, 내 위치를 좌표값으로 
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error, options);
  },[])

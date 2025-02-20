const fetchQuote = () => fetch("https://korean-advice-open-api.vercel.app/api/advice")
    .then(response => {
        if (!response.ok) throw new Error(`HTTP 오류상태 코드: ${response.status}`);
        return response.json()
    })

//이것도 리팩토링 
const getQuotes = async () => {

    try {

        //병렬 프로미스 요청을 보내기
        const promises = Array.from({ length: 10 }, () => fetchQuote())
        const results = await Promise.allSettled(promises) //모든 요청을 병렬로 처리 //개별실패처리
        return results.filter(({ status }) => status === "fulfilled").map(({ value: { message, author } }) => ({ message, author }))

    } catch (error) {
        console.log("getQuote 에러", error);
    }

}


const getOneQuote = async () => {
    const { message, author } = await fetchQuote();
    return { message, author };

}

const randomQuote = (data) => {
    return data[Math.floor(Math.random() * data.length)];
}


//너무 늘어지니까 
const handleLocalQuote = async () => {
    let count = JSON.parse(localStorage.getItem("count")) || 0;
    let quotes = JSON.parse(localStorage.getItem("quotes"))
    console.log("count:", count);
    console.log("quotes:", quotes);

    //로컬스토리지가 비었을경우
    if (!count) {
        //카운트 플러스 해주기
        ++count;
        localStorage.setItem("count", JSON.stringify(count))
        //인용구들 받아오기
        quotes = await getQuotes()
        localStorage.setItem("quotes", JSON.stringify(quotes))
        //인용구하나 받고 리턴
        return await getOneQuote();
    } else if (count >= 10) {
        //count가 10의 배수일경우
        //카운트를 0으로 초기화 한다.
        localStorage.setItem("count", JSON.stringify(0))
        //인용구들주에서 랜덤한 값을 리턴한다.
        return randomQuote(quotes);
    } else {
        //로컬스토리지가 비어있지 않은경우
        //카운트를 플러스해준다.
        ++count;
        localStorage.setItem("count", JSON.stringify(count))
        //인용구들중에서 랜덤한 값을 리턴한다
        return randomQuote(quotes);
    }

}



//비동기 함수들이 섞여있으니 여기서 실행
(async () => {

    const loding = document.querySelector('#quote span:first-child')
    const message = document.querySelector('#quote span:nth-child(2)')
    const author = document.querySelector('#quote span:last-child')

    console.log("loding", loding.innerHTML);
    console.log("message", message.innerHTML);
    console.log("author", author.innerHTML);


    const quote = await handleLocalQuote();
    console.log("quote:", quote);
    message.innerHTML = quote.message;
    author.innerHTML = quote.author;


})();








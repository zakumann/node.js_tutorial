const express = require("express");
const sequelize = require('./models').sequelize;
const app = express();

sequelize.sync(); // Sequelize 객체의 sync() 함수를 호출해서 모델에 정의한 테이블이 없을 때 생성해 줍니다.

const {customers} = require('./models');

app.use(express.json({
    limit: '50mb' // 최대 50메가
})); // 클라이언트 요청 body를 json으로 파싱 처리

app.listen(3000, () => {
    // 3000번 포트로 웹 서버 실행
    console.log('Server started. port 3000.');
});

//고객 정보 조회 라우터
app.get('/api/customers', async (req, res) => {
    const customersData = await customers.findAll(); // customers 테이블의 모든 데이터 조회
    console.log(customersData); // 고객 목록 콘솔 출력
    res.send(customersData); //결과를 클라이언트로 보냄
});
import mysql from 'mysql2/promise';

// createPoolCluster 는 뭘까?

/*  
    mysql2는 Promise API 제공함 - async/await
    Prepared Statements를 지원
    caching_sha2_password 지원
    caching_sha2_password 를 이용하려면 커넥션 속성에 ssl 추가 필요

    아래 커맨드로 어떤 인증방식인지 확인
    SELECT user, host, plugin FROM mysql.user WHERE user='your_user';

    mysql 8.0 버전부터
    caching_sha2_password 인증방식을 도입
    사용자 인증방식을 native password 방식으로 변경 제안
    ALTER USER 'your_username'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'your_password';
    FLUSH PRIVILEGES; -> GRANT 및 REVOKE 명령을 제외한 권한 변경사항 즉시적용

    사용자가 없어서 접근을 못하면
    mysql 접속 - mysql -u [user] -p
    사용자 있는지 확인
    SELECT user, host FROM mysql.user WHERE user='user_name' AND host='host_name';
    사용자 신규
    CREATE USER 'user_name'@'host_name' IDENTIFIED BY 'password';
    사용자 삭제
    DROP USER 'user_name'@'host_name';

    db 접근권한이 없을 경우
    GRANT ALL PRIVILEGES ON [database_name].* TO 'user_name'@'localhost';
    FLUSH PRIVILEGES;
*/


const pool = mysql.createPool({
    host: process.env.CAL_HOST || 'localhost',
    port: '3306',
    user: process.env.CAL_USER || 'dev',
    password: process.env.CAL_PASSWORD || '1234',
    database: process.env.CAL_DATABASE || 'cal_history',
}); 

const getConn = async() => {
    return await pool.getConnection(async (conn) => conn);
};

export { getConn }
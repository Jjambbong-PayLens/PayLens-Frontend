
const KAKAO_CLIENT_ID = '본인의_카카오_REST_API_키_입력';
const GOOGLE_CLIENT_ID = '본인의_구글_클라이언트_ID_입력';

const REDIRECT_URI = 'http://localhost:8080/login.html';

// 소셜 로그인 인증 페이지 URL 생성
const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

// 구글 scope
const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

document.addEventListener('DOMContentLoaded', () => {
    
    const btnKakao = document.querySelector('.btn-kakao');
    const btnGoogle = document.querySelector('.btn-google');

    // 카카오 버튼
    btnKakao.addEventListener('click', () => {
        window.location.href = kakaoAuthUrl;
    });

    // 구글 버튼
    btnGoogle.addEventListener('click', () => {
        window.location.href = googleAuthUrl;
    });

    checkForAuthCode();
});

function checkForAuthCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        console.log("발급된 인가 코드:", code);
        
        // 백엔드 전송
        sendCodeToBackend(code);
    }
}

async function sendCodeToBackend(code) {
    try {
        const response = await fetch('https://본인의_백엔드_API_주소/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                authCode: code 
            }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('로그인에 성공했습니다!');
        } else {
            alert('서버 로그인 처리 실패');
        }
    } catch (error) {
        console.error('네트워크 에러:', error);
    }
}
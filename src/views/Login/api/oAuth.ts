export const KAKAO_REST_API_KEY = process.env.KAKAO_API_KEY;
export const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
export const KAKAO_BASE_URL = process.env.KAKAO_BASE_URL;

export const KAKAO_AUTH_URL = `${KAKAO_BASE_URL}/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

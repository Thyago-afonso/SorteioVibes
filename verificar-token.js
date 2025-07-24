// verificar-token.js
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '981725293339-ekqct59vomked91n5ba9mpjetdm5ojud.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MDljNTEzODc2OGY3Y2YyZTgyN2UwNGIyN2U3ZTRjYmM3YmI5MTkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5ODE3MjUyOTMzMzktZWtxY3Q1OXZvbWtlZDkxbjViYTltcGpldGRtNW9qdWQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5ODE3MjUyOTMzMzktZWtxY3Q1OXZvbWtlZDkxbjViYTltcGpldGRtNW9qdWQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY4NDI5OTE5MTU1NTI0ODU2MzYiLCJlbWFpbCI6InRoeWFnby5iYXJib3NhLjIwMDZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1MzM1OTQ4OCwibmFtZSI6IlRoeWFnbyBCYXJib3NhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0tBNTk4Sm5wRzROT0YyMVVQalREa3gxRVdaTjUxVlcyaDRqUmV5R0l3VWp0ai1Sdz1zOTYtYyIsImdpdmVuX25hbWUiOiJUaHlhZ28iLCJmYW1pbHlfbmFtZSI6IkJhcmJvc2EiLCJpYXQiOjE3NTMzNTk3ODgsImV4cCI6MTc1MzM2MzM4OCwianRpIjoiYjY2YjBhZDIzNTBmMWZhODdhNjQyYWM4Y2E4MTE3ZTk2MGZkOWYxZSJ9.jWLo6nhAQT4O6sOsQnZMPIeFHjUpQaQIxidwKM1axZzzSms1foGKPkSZ-NaCc7IAiuc2A-ZLE3H0HhvpOUHVVcpDHSNP0umaRSFdVR8oICWUV4NhmCsOidyWf0R_Cak9HrGEm9xRVd3OnRC7e72FKrsXO-jyvKiyZ9RKnrda6OT6UXQzOL9zi6J-ihabwVqYqIiO32pY0dEMo-3gdNU62xBIfW2jRCvft_INIKvVzNgr6D9SD2at1Qu67gm_uC6lLEFv5P5eDkVgtRxVM5XDJFhMZde5NFX6BMalHp6whckjbzpqmK8eLrYNLRNm3raDPQP66hBTngnjfzM7OUgVsQ'; // ← COLE o token copiado do console do navegador

async function verificar() {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    console.log('✅ Token válido para:', payload.email);
  } catch (err) {
    console.error('❌ Erro ao verificar token:', err);
  }
}

verificar();

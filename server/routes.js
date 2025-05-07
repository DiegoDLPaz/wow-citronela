import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const TOKEN_URL = 'https://oauth.battle.net/token';
const PROFILE_URL = 'https://eu.api.blizzard.com/profile/user/wow';
const clientId = process.env.BLIZZARD_CLIENT_ID;
const clientSecret = process.env.BLIZZARD_CLIENT_SECRET;

router.get('/profile', async (req, res) => {
  try {
    console.log('Client ID:', clientId);
    console.log('Client Secret:', clientSecret);
    // Step 1: Get OAuth token
    const tokenResponse = await axios.post(
      TOKEN_URL,
      new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Use token to fetch WoW profile
    const profileResponse = await axios.get(PROFILE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        namespace: 'profile-classic-eu',
        locale: 'es_GB',
      },
    });

    res.json(profileResponse.data);
  } catch (error) {
    console.error('Error fetching profile:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch profile.' });
  }
});

router.post('/token', async (req, res) => {
  const { code } = req.body;

  try {
    console.log('Client ID 2:', process.env.BLIZZARD_CLIENT_ID);
    console.log('Client Secret 2:', process.env.BLIZZARD_CLIENT_SECRET);
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', 'http://localhost:4200/callback');

    const tokenRes = await axios.post('https://oauth.battle.net/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`6ce61a35c09d4d2892a6f7df4e75a04b:iScZFRKfC1mbGpLkQFob3JUZDHH5kM0z`).toString('base64')
      }
    });

    res.json(tokenRes.data); // Send the token back to Angular
  } catch (err) {
    console.error('Token request failed:', err.response.data);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

export default router;

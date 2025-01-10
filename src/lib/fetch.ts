import axios from "axios";
export const refreshToken = async ({ token }: { token: string }) => {
  if (!process.env.INSTAGRAM_BASE_URL || token.length === 0)
    return {
      status: 400
    };
  const res = await await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );
  return {
    status: 200,
    token: res.data
  };
};

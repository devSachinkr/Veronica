import axios from "axios";
export const refreshToken = async ({ token }: { token: string }) => {
  if (!process.env.INSTAGRAM_BASE_URL || token.length === 0)
    return {
      status: 400,
    };
  const res = await await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );
  return {
    status: 200,
    token: res.data,
  };
};

export const sendDm = async ({
  userId,
  receiverId,
  prompt,
  token,
}: {
  userId: string;
  receiverId: string;
  prompt: string;
  token: string;
}) => {
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient_id: { id: receiverId },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const sendPrivateMessage = async (
  userId: string,
  receiverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: receiverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const generateTokens = async (code: string) => {
  const insta_form = new FormData();
  insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID!);

  insta_form.append("client_secret", process.env.INSTAGRAM_CLIENT_SECRET!);

  insta_form.append("grant_type", "authorization_code");
  insta_form.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_VERONICA_URL}/callback/instagram`
  );
  insta_form.append("code", code);

  const shortToken = await fetch(process.env.INSTAGRAM_TOKEN_URL!, {
    method: "POST",
    body: insta_form,
  });
  const token = await shortToken.json();
  if (token.permission.length > 0) {
    const long_token = await axios.get(
      `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
    );
    return long_token.data;
  }
};

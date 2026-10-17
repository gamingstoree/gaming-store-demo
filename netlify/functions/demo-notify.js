exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method not allowed"
    };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      statusCode: 500,
      body: "Configuration missing"
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text:
            "🎮 GAMING STORE\n" +
            "✅ Nouvelle simulation de commande\n" +
            "💳 Paiement fictif uniquement\n" +
            "💰 Aucun argent encaissé"
        })
      }
    );

    if (!response.ok) {
      return {
        statusCode: 502,
        body: "Telegram notification failed"
      };
    }

    return {
      statusCode: 200,
      body: "Demo notification sent"
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Notification error"
    };
  }
};

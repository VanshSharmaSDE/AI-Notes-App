// sentiment analysis
history: [
    {
      role: "user",
      parts: [{ text: "Analyze the sentiment of the following Tweets and classify them as POSITIVE, NEGATIVE, or NEUTRAL. \"It's so beautiful today!\""}],
    },
    {
      role: "model",
      parts: [{ text: "POSITIVE"}],
    },
    {
      role: "user",
      parts: [{ text: "\"It's so cold today I can't feel my feet...\""}],
    },
    {
      role: "model",
      parts: [{ text: "NEGATIVE"}],
    },
    {
      role: "user",
      parts: [{ text: "\"The weather today is perfectly adequate.\""}],
    },
    {
      role: "model",
      parts: [{ text: "NEUTRAL"}],
    },
    {
      role: "user",
      parts: [{ text: "i think i should give up"}],
    },
    {
      role: "model",
      parts: [{ text: "NEGATIVE"}],
    },
  ]

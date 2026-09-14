import fs from "fs";
import path from "path";
import { Mistral } from "@mistralai/mistralai";

async function main() {
  const envPath = path.join(process.cwd(), ".env.local");

  console.log("Checking:", envPath);
  console.log("File exists:", fs.existsSync(envPath));

  const envText = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf8")
    : "";

  const match = envText.match(/^MISTRAL_API_KEY=(.*)$/m);

  console.log(
    "MISTRAL_API_KEY found:",
    !!match,
    "has value:",
    !!match?.[1]?.trim()
  );

  const apiKey = match?.[1]?.trim();

  if (!apiKey) {
    throw new Error("MISTRAL_API_KEY is missing from .env.local");
  }

  const client = new Mistral({ apiKey });

  const response = await client.chat.complete({
    model: "mistral-small-2603",
    messages: [
      {
        role: "user",
        content: "Reply with exactly: MISTRAL_OK",
      },
    ],
  });

  console.log(response.choices?.[0]?.message?.content);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
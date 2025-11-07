import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { answerQuestion } from "../services/note.service";

export function AskForm({ userId }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAskQuestion = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const data = await answerQuestion(userId, question);
      setAnswer(data?.answer || "No answer available.");
    } catch (err) {
      console.error("Error answering question:", err);
      setError("Failed to get answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlerClearAnswer = () => {
    setAnswer("");
    setError("");
    setQuestion("");
  };

  return (
    <Card>
      <form onSubmit={handleAskQuestion}>
        <CardContent className="grid gap-3">
          <Label className="font-bold">Ask a Question About Notes</Label>
          <Input
            type="search"
            placeholder="Your question..."
            className="bg-white"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              type="submit"
              variant="default"
              className="w-32"
              disabled={loading}
            >
              {loading ? "In thinking..." : "Ask"}
            </Button>
            {!answer && !error ? null : (
              <Button variant="outline" onClick={handlerClearAnswer}>
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </form>
      {answer && (
        <CardContent>
          <Label className="font-bold">The AI answer:</Label>
          <p className="p-2">{answer}</p>
        </CardContent>
      )}
      {!!error && <div className="text-center text-red-500">{error}</div>}
    </Card>
  );
}

import type { Metadata } from "next";
import CommentsBoard from "../../components/features/CommentsBoard";
import { getComments } from "./actions";

export const metadata: Metadata = {
  title: "Comments",
  description: "Leave a kind message on the comment board.",
};

export default async function CommentsPage() {
  const comments = await getComments();

  return (
    <main className="section">
      <div className="section-head">
        <h2>
          Welcome to my <em>comment board</em>
        </h2>
        <span className="section-label">Guestbook</span>
      </div>
      <p style={{ marginBottom: "32px" }}>
        Leave a kind message below.
      </p>
      {/* pass the comments to the CommentsBoard component */}
      <CommentsBoard initialComments={comments} />
    </main>
  );
}

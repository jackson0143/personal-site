import CommentsBoard from "../../components/features/CommentsBoard";

export default function CommentsPage() {
  return (
    <main className="flex flex-col gap-4">
      <h1 className="font-bold pt-10 pb-2 text-xl">
        <span className="main-header">
          Welcome to my comment board
        </span>
      </h1>
      <p className="text-sm text-muted-foreground">Leave a kind message below.</p>

      <CommentsBoard />
    </main>
  );
}
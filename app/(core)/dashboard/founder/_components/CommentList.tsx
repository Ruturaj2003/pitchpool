
import { SharkComment } from "../data/mockComments";
import { SharkCommentCard } from "./SharkCommentCard";

interface CommentsListProps {
  comments: SharkComment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {comments.map((comment, index) => (
        <SharkCommentCard 
          key={comment.id} 
          comment={comment} 
          index={index} 
        />
      ))}
      
      {comments.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400">No comments found.</p>
        </div>
      )}
    </div>
  );
}
